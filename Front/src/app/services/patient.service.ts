import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rdv } from '../Models/Rdv';
import { RdvRequest } from '../Models/RdvRequest';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8180'; // Remplacez l'URL par celle de votre API back-end

  constructor(private http: HttpClient) { }
  addRdv(idPsy: string, idHoraire: string, date: string, rdvData: RdvRequest): Observable<Rdv> {
    return this.http.post<Rdv>(`${this.apiUrl}/api/rdv/add/${idPsy}/${idHoraire}/${date}`, rdvData);
  }
}
