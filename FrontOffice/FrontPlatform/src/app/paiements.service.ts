import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementsService {

  private baseUrl = 'http://localhost:8185/api/payments';
  constructor(private http: HttpClient) { }
  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }}
