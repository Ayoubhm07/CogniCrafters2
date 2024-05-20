import { Categories } from "../Models/category";

export interface Product {
  priceInUSD: number;
  priceInDetectedCurrency: number; // Nouvelle propriété pour stocker le prix converti
  _id?: any;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  image?:string;
  etat?:Boolean;
  currency?: string; // Nouvelle propriété pour l'unité de devise
  sku?: string; // Nouvelle propriété pour l'unité de devise
  categories?:Categories;
  tags: string[]; // Définissez tags comme une liste de chaînes de caractères
  discount?:number,
  isInWishlist: boolean; // Propriété pour suivre la liste de souhaits
  rating: number;
  associatedProducts?: Product[]; // Initialisez avec un tableau vide ou une valeur par défaut selon vos besoins
}
