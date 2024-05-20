import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
interface JwtToken {
  sub: string; // Subject (User ID)
  psychiatristId: string; // ID of the psychiatrist
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:8081/api/v1/auth/users';
  private baseUrl = 'http://localhost:8081/api/v1/auth/role';
  private base = 'http://localhost:8081/api/v1/auth';



  constructor(private http: HttpClient) { }

  
  logout(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('userId', userId); // Setting userId as a query parameter

    return this.http.post(`${this.base}/logout`, {}, { headers, params });
  }
  getUserById(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
  getAllUsersWithRole(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      throw new Error('Token not found in localStorage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}`, { headers: headers });
  }

 
  updateUserRole(userId: string, role: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/role`;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Bearer token not found in local storage');      
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = { role };

    return this.http.post<any>(url, null, { headers, params }).pipe(
      tap(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Rôle utilisateur mis à jour avec succès.'
          });
        }
      )
    );
  }

}
