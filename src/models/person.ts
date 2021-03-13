import Base, { IBase } from './base';

export interface IPerson extends IBase {
  born: string;
  hometown: string;
  jobTitles: string;
  height: string;
  filmography: string;
}

export default class Person extends Base {
  protected _born: string;
  protected _hometown: string;
  protected _jobTitles: string;
  protected _height: string;
  protected _filmography: string;

  constructor(config: IPerson) {
    super(config);
    this._born = config.born;
    this._hometown = config.hometown;
    this._jobTitles = config.jobTitles;
    this._height = config.height;
    this._filmography = config.filmography;
    this.setLink();
  }

  setLink(): void {
    this._link = `/name/${this._id}`;
  }
}

module.exports = Person;
