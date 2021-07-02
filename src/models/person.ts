import Base, { IBase } from './base';

export interface IPerson extends IBase {
  born: string;
  hometown: string;
  jobTitles: string;
  height: string;
  filmography: string;
}

export default class Person extends Base {
  protected born: string;
  protected hometown: string;
  protected jobTitles: string;
  protected height: string;
  protected filmography: string;

  constructor(config: IPerson) {
    super(config);
    this.born = config.born;
    this.hometown = config.hometown;
    this.jobTitles = config.jobTitles;
    this.height = config.height;
    this.filmography = config.filmography;
    this.setLink();
  }

  setLink(): void {
    this.link = `/name/${this.id}`;
  }
}

module.exports = Person;
