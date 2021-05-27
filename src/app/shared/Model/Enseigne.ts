import { PointVente } from './pointVente';
export class Enseigne {
  public _id: number;
  public name: string;
  public description: string;
  public horairedebut: string;
  public horairefin: string;
  public numerotel:number;
  public adresse: string;
  public url: string;
  public jours: [];
  public activeUrl: string;
  // public startLocation:{
  //   address:string,
  //   coordinates: []
  // }
  public photo: string;
  public pointvente: PointVente[]
  constructor(_id: number,
    name: string,
    description: string,
    photo: string,
    numerotel:number,
    pointvente: PointVente[]) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.numerotel= numerotel;
    this.photo = photo;
    this.pointvente = pointvente
  }


}
