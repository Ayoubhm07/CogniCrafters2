import { Psy } from "./psy";

export interface HorairePsy {
    _id: string;
heureDebut:string ;
heureFin: string;
dispo: boolean;
psychiatre: Psy; 
nbplace:number;

  }
  