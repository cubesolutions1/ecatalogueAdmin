import { Enseigne } from './Enseigne';
export class User {
    public id: string;
    public email: string;
    public password: string;
    public passwordConfirm: string;
    public role: string;
    public _id: string;
    public name: string;
    public prenom: string;
    public adresse: string;
    public photo: string;
    public phone: number;
    public fax: number;
    public codepostale: number;
    public enseigne: Enseigne;
    public type: string;
    public sexe: string;
    public createdAt: string;

    constructor() {

    }
}
