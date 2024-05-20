import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieArticle } from '../Models/CategorieArticle';
@Injectable({
  providedIn: 'root'
})
export class CategorieArticleService {
  constructor(private http: HttpClient) { }

  getCategorieArticle(): Observable<CategorieArticle[]> {
    return this.http.get<CategorieArticle[]>('http://localhost:8180/api/categorieA/get');
  }
}
