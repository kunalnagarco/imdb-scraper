var Base = require('./base');

class Person extends Base {

	constructor(config) {
		super(config);
		this.born = config.born;
		this.hometown = config.hometown;
		this.jobTitles = config.jobTitles;
		this.height = config.height;
		this.filmography = config.filmography;
		this.setLink();
	}

	setLink(nameID) {
		this.link = '/name/' + this.id;
	}

};

module.exports = Person;