import config from 'config'

module.exports = {
	[`${config.BASE}`]: require('./sections/home'),
	[`${config.BASE}about`]: { section: require('./sections/about') },
	[`${config.BASE}work/:id`]: { section: require('./sections/work'), duplicate: true  }
	}
