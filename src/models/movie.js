const Base = require('./base');

class Movie extends Base {
    constructor(config) {
        super(config);
        this.year = config.year;
        this.plot = config.plot;
        this.storyline = config.storyline;
        this.certificate = config.certificate;
        this.rating = config.rating;
        this.votes = config.votes;
        this.movieMeterCurrentRank = config.movieMeterCurrentRank;
        this.runtime = config.runtime;
        this.release = config.release;
        this.metascore = config.metascore;
        this.trailer = config.trailer;
        this.genres = config.genres;
        this.stars = config.stars;
        this.directors = config.directors;
        this.creators = config.creators;
    }

    static buildGenre(genre) {
        return {
            link: `/search/title?genres=${genre.toLowerCase()}`,
            name: genre,
        };
    }
}

module.exports = Movie;
