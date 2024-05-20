import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpLocationService {

  constructor(private http: HttpClient) {}

  getIpLocation(ipAddress: string): Observable<any> {
    const url = 'http://localhost:5201/get_ip_info';
    return this.http.post(url, { ip_address: ipAddress });
  }
}
