import { Patient } from "./Patient";

export interface commentaires {
    // _id: string; 
    contenu: string; 
    date_publication: Date;
    auteur?:Patient;
    translatedContent?: string;  }
  