// psychologue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psy } from '../Models/psy';
import { Rdv } from '../Models/Rdv';

@Injectable({
  providedIn: 'root'
})
export class PsychologueService {
  constructor(private http: HttpClient) { }

  getPsychologues(): Observable<Psy[]> {
    return this.http.get<Psy[]>('http://localhost:8081/api/pedopsychiatres/get');
  }
  getRendezVousPsy(psyId: string): Observable<Rdv[]> {
    return this.http.get<Rdv[]>(`http://localhost:8081/api/rdv/psy/${psyId}`);
  }
}
