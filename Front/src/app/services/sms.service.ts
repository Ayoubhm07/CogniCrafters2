import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient) { }

  sendSms(smsRequest: any): Observable<any> {
    return this.http.post<any>('http://localhost:8282/api/sms', smsRequest);
  }
}
