import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import { on, off } from 'dom-event'
import framework from 'framework'

class Work extends Default {

	constructor(opt) {

		super(opt)
		this.slug = 'work'
    this.route = null
	}

	init(req, done) {
		this.route = req.params.id
		super.init(req, done)
	}

	ready(done) {
		super.ready()
		done()
	}


	animateIn(req, done) {
		classes.add(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.set(this.page, { autoAlpha: 1, y:-500})

		tl.to(this.page, 3, { y: 0 })
		tl.staggerFromTo(this.ui.animate, 2, {
			autoAlpha: 0,
			y: 10
		}, {
			autoAlpha: 1,
			y: 0
		}, 0.4)


		tl.restart()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: done })

		tl.to(this.page, 1, { autoAlpha: 0 })
		tl.restart()
	}

	resize(width, height) {
		const attrs = { width: width, height: height }
		if(this.ui.iframe){
			if(this.ui.iframe.length > 1 ){
					this.ui.iframe.forEach(iframe => iframe && Object.assign(iframe, attrs))
			}
			else{
					this.ui.iframe && Object.assign(this.ui.iframe, attrs)
			}
		}
	}

	destroy(req, done) {
		document.documentElement.scrollTop = document.body.scrollTop = 0
		super.destroy()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Work
