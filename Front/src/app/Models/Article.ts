import { commentaires } from "./Commentaire";

export interface Article {
  liked: boolean;
    _id?: string;
    titre?: string;

    contenu?: string;
    date_publication?: Date;
    nbvues?: number;
    nblikes?: number;
    nbcmntr?: number;
    image?: string;
    cat?: any; 
    commentaires:commentaires;
        auteur?: any; 
  }
  