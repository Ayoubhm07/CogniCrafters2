import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeRec } from './typeRec';

@Injectable({
  providedIn: 'root'
})
export class TypeRecService {

  apiUrl  = "http://localhost:8080/typeRec"; 
  constructor(private http: HttpClient ) { }

  getType(): Observable<TypeRec[]> {
    return this.http.get<TypeRec[]>(`${this.apiUrl +"/afficher" }`);
}
}
