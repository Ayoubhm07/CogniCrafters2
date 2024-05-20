import { Patient } from './Patient' 
import { Psy } from './psy'; // Assurez-vous d'importer le modèle Psychiatre si nécessaire

export interface Rdv {
  id?: string;
  psychiatreId: string;
  date: string; 
  horaireId: string; 
  patient: Patient; 
  nbplace:number;

}
