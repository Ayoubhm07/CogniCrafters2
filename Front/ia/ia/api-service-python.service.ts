import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicePythonService {

  private apiUrl = 'http://localhost:5000';  // URL de votre API Python

  constructor(private http: HttpClient) { }

  getPredictions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/predict_sentiment`);
  }
}
