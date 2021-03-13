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
  protected _year: string;
  protected _plot: string;
  protected _storyline: string;
  protected _certificate: string;
  protected _rating: number;
  protected _votes: number;
  protected _movieMeterCurrentRank: string;
  protected _runtime: string;
  protected _release: string;
  protected _metascore: string;
  protected _trailer: string;
  protected _genres: string;
  protected _stars: string;
  protected _directors: string;
  protected _creators: string;

  constructor(config: IMovie) {
    super(config);
    this._year = config.year;
    this._plot = config.plot;
    this._storyline = config.storyline;
    this._certificate = config.certificate;
    this._rating = config.rating;
    this._votes = config.votes;
    this._movieMeterCurrentRank = config.movieMeterCurrentRank;
    this._runtime = config.runtime;
    this._release = config.release;
    this._metascore = config.metascore;
    this._trailer = config.trailer;
    this._genres = config.genres;
    this._stars = config.stars;
    this._directors = config.directors;
    this._creators = config.creators;
  }

  buildGenre(genre: string): { link: string; name: string } {
    return {
      link: `/search/title?genres=${genre.toLowerCase()}`,
      name: genre,
    };
  }
}

module.exports = Movie;
