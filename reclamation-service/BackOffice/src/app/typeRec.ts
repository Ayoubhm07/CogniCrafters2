export class TypeRec {
    _id:string;
    nom: string;
   
    createdAt:Date;

    constructor(_id:string,nom: string,createdAt:Date)  {
        this._id=_id;
        this.nom = nom;
      
        this.createdAt=createdAt;
        
    }
}


