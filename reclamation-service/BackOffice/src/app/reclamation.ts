export class Reclamation {
    _id:string;
    sujet: string;
    description: string;
    nom: string;
    prenom: string ;
    mail: string ;
    tel: Number;
    type: string;
    createdAt:Date;

    constructor(_id:string,sujet: string, description: string , nom : string , prenom : string ,mail : string ,tel:Number,type:string,createdAt:Date)  {
        this._id=_id;
        this.sujet = sujet;
        this.description = description;
        this.nom=nom;
        this.prenom=prenom;
        this.mail=mail;
        this.tel=tel;
        this.type=type;
        this.createdAt=createdAt;
        
    }
}

