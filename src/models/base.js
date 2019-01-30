var constants = require('../constants');

class Base {

	constructor(config) {
		this.baseUrl = constants.IMDB.BASE;
		this.id = config.id;
		this.description = config.description;
		this.name = config.name;
		this.type = config.type;
		this.link = config.link;
		this.img = config.img;
		this.keywords = config.keywords;
	}
}

module.exports = Base;
