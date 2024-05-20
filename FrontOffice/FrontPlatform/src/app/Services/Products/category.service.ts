import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../Models/categories';
const baseUrl = 'http://localhost:8185/api/v1/category'; // Assurez-vous de configurer correctement l'URL de votre backend

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${baseUrl}/getAll`);
  }
}

