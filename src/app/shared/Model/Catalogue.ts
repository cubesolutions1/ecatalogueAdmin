import { Categories } from 'app/shared/Model/categories';

export class Catalogue {
    name:string;
    description:string;
    categories:any;
    enseignes:string;
    commercant:string;
    typecompagne:string;
    dateDebut:string;
    heureDebut:string;
    dateFin:string;
    heureFin:string;
    pdf:string;
    photo:string;
    etat:string;
    tags:any;
    pointvente: any; 
    constructor(){}
    // public set $commercant(x: Commercant) {
    //     this.commercant = x
    // }
}
