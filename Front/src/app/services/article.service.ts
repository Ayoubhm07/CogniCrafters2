import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../Models/Article';
import { commentaires } from '../Models/Commentaire';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8180/api/article';


  constructor(private http: HttpClient) { }

  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:8180/api/article/get');
  }
  getArticleById(id: string): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Article>(url);
  }
  getCommentairesByArticleId(articleId: string): Observable<commentaires[]> {
    return this.http.get<commentaires[]>(`${this.apiUrl}/comments/${articleId}`);
  }
  ajouterCommentaire(articleId: string, commentaire: commentaires, auteurId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments/${articleId}?patientId=${auteurId}`, commentaire);
  }
  likeArticle(articleId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/like/${articleId}`, {});
  }
}