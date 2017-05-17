import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import { on, off } from 'dom-event'
import framework from 'framework'
import Player from '@vimeo/player'

class Home extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'home'
		this.playing = false

			}

	init(req, done) {

		super.init(req, done)
	}

	ready(done) {

		super.ready()
		done()
	}



	addEvents() {


	}

	removeEvents() {

	}


	animateIn(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: done })

		classes.add(config.body, `is-${this.slug}`)

		tl.to(this.page, 1, { autoAlpha: 1 })
		tl.staggerFromTo(this.ui.animate, 3, {
			autoAlpha: 0,
			y: 10
		}, {
			autoAlpha: 1,
			y: 0
		}, 0.4)
		tl.restart()
	}

	animateOut(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: done })

		classes.remove(config.body, `is-${this.slug}`)

		if (this.playing === false) {
			tl.staggerFromTo(this.ui.animate, 0.7, { autoAlpha: 1 }, { autoAlpha: 0 }, -0.1)
		}

		tl.to(this.page, 0.7, { autoAlpha: 0 })
		tl.restart()
	}

	resize(width, height) {
		const attrs = { width: width, height: height }

		this.iframe && Object.assign(this.iframe, attrs)
	}

	destroy(req, done) {

		super.destroy()
		this.removeEvents()
		this.ui = null
		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Home
