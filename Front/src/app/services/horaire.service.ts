import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HorairePsy } from '../Models/HorairePsy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  private apiUrl = 'http://localhost:8082'; // Remplacez l'URL par celle de votre API back-end

  constructor(private http: HttpClient) { }

  getHorairesPsy(idPsy: string): Observable<HorairePsy[]> {
    return this.http.get<HorairePsy[]>(`${this.apiUrl}/api/horaire/get/${idPsy}`);
  }
}