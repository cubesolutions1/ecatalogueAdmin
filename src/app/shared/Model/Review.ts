export class Review {
    _id: string;
    name: string;
    active: boolean;
    commentaire: any;
    rating: number;
    produit: string;
    createdAt: string;
    user: User;
    catalogue: Catalogue;

}
class User {
    _id: string;
    photo: string;
    name: any;
}
class Catalogue {
    _id: string;
    photo: string;
    name: any;
}
