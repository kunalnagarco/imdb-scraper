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
  protected _baseUrl: string;
  protected _id: string;
  protected _description: string;
  protected _name: string;
  protected _type: string;
  protected _link: string;
  protected _img: string;
  protected _keywords: string;

  constructor(config: IBase) {
    this._baseUrl = constants.IMDB.BASE;
    this._id = config.id;
    this._description = config.description;
    this._name = config.name;
    this._type = config.type;
    this._link = config.link;
    this._img = config.img;
    this._keywords = config.keywords;
  }
}
