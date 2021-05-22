import { User } from './User';
import { PointVente } from './pointVente';
import { Enseigne } from './Enseigne';
export class Commercant {

    public id: string;
    public fax: number;
    public enseigne: Enseigne;
    public pointVente: PointVente;
    public user: User;
    public type: string;

    constructor() { }
    public set $user(x: User) {
        this.user = x
    }
    public set $enseigne(x: Enseigne) {
        this.enseigne = x
    }
    public set $pointvente(x: PointVente) {
        this.pointVente = x
    }
}
