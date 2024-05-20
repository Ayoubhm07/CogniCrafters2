import { List } from 'choices.js/public/types/src/scripts/components';
import { Categories } from './categories';
export interface Product {
  _id?: any;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  image?:string;
  etat?:Boolean;
  currency?: string; // Nouvelle propriété pour l'unité de devise
  sku?: string; // Nouvelle propriété pour l'unité de devise
  categoryName?: string;
  tags: string[]; // Définissez tags comme une liste de chaînes de caractères
  discount?:number
  rating?:number;

}
