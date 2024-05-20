import { StatutCommande } from "./StatutCommande";

export interface Commande {
  _id:string;
  client: {
    id:"1"
    nom: string;
    email: string;
    adresse:  {
      rue: string;
      ville: string;
      pays: string;
    };
  };
  articles: {
    _id: string;
    quantite: number;
    price:number;
    discount:number;
    name:string;
    image:string

  }[];

  statut:StatutCommande, // Correction ici

  quantiteAcheteParProduit?: { [productId: string]: number };
}