import { constants } from '../constants';

export interface IBase {
  id: string;
  description: string;
  name: string;
  type: string;
  link: string;
  img: string;
  keywords: string;
}

export default class Base {
  protected baseUrl: string;
  protected id: string;
  protected description: string;
  protected name: string;
  protected type: string;
  protected link: string;
  protected img: string;
  protected keywords: string;

  constructor(config: IBase) {
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
