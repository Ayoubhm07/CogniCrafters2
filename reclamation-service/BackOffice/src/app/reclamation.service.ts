import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from './reclamation';

@Injectable()

export class ReclamationService {

  apiUrl  = "http://localhost:8080/reclamation"; 
  constructor(private http: HttpClient ) { }

  getReclamation(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl +"/afficher" }`);
}
getReclamationById(_id: string): Observable<any> {
  return this.http.get(`${this.apiUrl+ "/find"}/${_id}`);
}
updateReclamation(_id : String, value: any): Observable<Object>{
  return this.http.put<Object>(`${this.apiUrl +"/modifier"}/${_id}`,value);
}
ajouterReclamation(emplois?: Reclamation): Observable<Object>{
  return this.http.post<Object>(`${this.apiUrl +"/ajouter" }`,emplois)
}
deleteReclamation(_id?: String): Observable<Object>{
  return this.http.delete<Object>(`${this.apiUrl +"/supprimer" }/${_id}`)
}
}
