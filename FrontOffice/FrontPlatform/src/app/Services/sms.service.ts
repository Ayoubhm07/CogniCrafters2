import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private http: HttpClient) { }

  sendSms(phone: number, message: string) {
    const apiUrl = 'http://localhost:8282/api/sms/send';
    const body = {
      phone,
      message
    };

    return this.http.post(apiUrl, body);
  }
}
