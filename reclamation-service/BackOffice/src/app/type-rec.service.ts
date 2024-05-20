import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeRec } from './typeRec';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeRecService {

  apiUrl  = "http://localhost:8080/typeRec"; 
  constructor(private http: HttpClient ) { }

  getTypeRec(): Observable<TypeRec[]> {
    return this.http.get<TypeRec[]>(`${this.apiUrl +"/afficher" }`);
}
getTypeRecById(_id: string): Observable<any> {
  return this.http.get(`${this.apiUrl+ "/find"}/${_id}`);
}
updateTypeRec(_id : String, value: any): Observable<Object>{
  return this.http.put<Object>(`${this.apiUrl +"/modifier"}/${_id}`,value);
}
ajouterTypeRec(types?: TypeRec): Observable<Object>{
  return this.http.post<Object>(`${this.apiUrl +"/ajouter" }`,types)
}
deleteTypeRec(_id?: String): Observable<Object>{
  return this.http.delete<Object>(`${this.apiUrl +"/supprimer" }/${_id}`)
}
}
