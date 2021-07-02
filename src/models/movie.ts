import Base, { IBase } from './base';

export interface IMovie extends IBase {
  year: string;
  plot: string;
  storyline: string;
  certificate: string;
  rating: number;
  votes: number;
  movieMeterCurrentRank: string;
  runtime: string;
  release: string;
  metascore: string;
  trailer: string;
  genres: string;
  stars: string;
  directors: string;
  creators: string;
}

export default class Movie extends Base {
  protected year: string;
  protected plot: string;
  protected storyline: string;
  protected certificate: string;
  protected rating: number;
  protected votes: number;
  protected movieMeterCurrentRank: string;
  protected runtime: string;
  protected release: string;
  protected metascore: string;
  protected trailer: string;
  protected genres: string;
  protected stars: string;
  protected directors: string;
  protected creators: string;

  constructor(config: IMovie) {
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

  buildGenre(genre: string): { link: string; name: string } {
    return {
      link: `/search/title?genres=${genre.toLowerCase()}`,
      name: genre,
    };
  }
}

module.exports = Movie;
