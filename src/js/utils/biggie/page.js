import 'whatwg-fetch'
import config from 'config'
import cache from 'cache'
import create from 'dom-create-element'
import slug from './slug'
import model from './model'
import Mustache from 'mustache'

export default (req, view, options, done) => {

const id = slug(req, options)
const cn = id.replace('/', '-')
const page = create({
    selector: 'div',
    id: `page-${cn}`,
    styles: `page page-${cn}`
})
const works = window._data.work
const data = req.params.id ? works[req.params.id] : window._data[id]

view.appendChild(page)

if (!cache[id]) {

    if (req.params.id) {

        const parts = ['image', 'color', 'split', 'text', 'video', "embed"]
        const templates = ['work', ...parts.map(part => `components/${part}`)]
        const urls = templates.map(tmpl => `${config.BASE}templates/${tmpl}.mst`)
        const keys = Object.keys(works)
        const current = keys.indexOf(req.params.id)
        const prev = current === 0 ? keys.length - 1 : current - 1
        const next = current === keys.length - 1 ? 0 : current + 1
        const nextProject = works[keys[next]]
        const prevProject = works[keys[prev]]
        const nextHeroImgSrc = nextProject.image
        const prevHeroImgSrc = prevProject.image

        data['next'] = {
            title: nextProject.title,
            slug: nextProject.slug,
            hero: nextHeroImgSrc
        }

        data['prev'] = {
            title: prevProject.name,
            slug: prevProject.slug,
            hero: prevHeroImgSrc
        }

        Promise.all(
            urls.map(url => fetch(url).then(res => res.text()))
        ).then(partials => {
            const tmpl = partials.shift()
            partials.forEach((partial, i) => cache.partials[`${parts[i]}_part`] = partial)
            return tmpl
        }).then(tmpl => {
            const rendered = Mustache.render(tmpl, data, cache.partials)
            page.innerHTML = rendered
            cache[id] = rendered
            done()
        })
    }
     else {
        fetch(`${config.BASE}templates/${id}.mst`).then(res => res.text()).then(tmpl => {
            const rendered = Mustache.render(tmpl, data)
            page.innerHTML = rendered
            cache[id] = rendered
            done()
        })
    }
  }
    else {
        requestAnimationFrame(_ => {
            page.innerHTML = cache[id]
            done()
        })
    }
return page
}
