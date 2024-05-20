import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8282'; 

  constructor(private http: HttpClient) { }

  sendNotification(token: string, title: string, body: string): Observable<any> {
    const payload = { token, title, body };
    return this.http.post(`${this.baseUrl}/send-notification`, payload, { responseType: 'text' });
  }
  
}
