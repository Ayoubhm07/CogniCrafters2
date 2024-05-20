import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, Sex, ApiUser } from '../Models/user.model';
import { Session } from '../Models/session.model';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/v1/auth/users';
  private sessionUrl = 'http://localhost:8081/api/v1/auth/user';
  private baseUrl = 'http://localhost:8081/api/v1/auth';


  constructor(private http: HttpClient) {}

  

  updateUser(email: string, user: User) {
    return this.http.put(`http://localhost:8081/api/v1/auth/update/${email}`, user, { responseType: 'text' });
}

getPsychiatrists(): Observable<User[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in localStorage');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<ApiUser[]>(`${this.baseUrl}/role`, { headers }).pipe(
    map(users => users.map(user => ({
      ...user,
      adresse: user.attributes?.adresse ? user.attributes.adresse[0] : null,
      phone: user.attributes?.phone ? parseInt(user.attributes.phone[0], 10) : null,
      sex: user.attributes?.sex ? user.attributes.sex[0] as Sex : null,
      verified: user.attributes?.verified ? user.attributes.verified[0] === 'true' : false,
      image: user.attributes?.image ? user.attributes.image[0] : null
    } as User)))
  );
}

getAssociations(): Observable<User[]> {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    throw new Error('Token not found in localStorage');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<User[]>(`${this.baseUrl}/roleA`, { headers: headers });
}

getClients(): Observable<User[]> {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    throw new Error('Token not found in localStorage');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.baseUrl}/roleC`, { headers: headers });
}

  getUserById(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  getUserSessions(userId: string): Observable<Session[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.sessionUrl}/${userId}/sessions`, { headers }).pipe(
      map(sessions => sessions.map(session => ({
        ip: session.ipAddress,
        start: format(new Date(session.start), 'PPpp'), 
        lastAccess: format(new Date(session.lastAccess), 'PPpp')
      })))
    );
  }

  updatePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const url = 'http://localhost:8081/api/v1/auth/update-password';
    const body = { email, currentPassword, newPassword };
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, body, { headers });
    }

    disableUser(userId: string): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.post(`http://localhost:8081/api/v1/auth/disable/${userId}`, {}, { headers });
    }
    isUserEnabled(userId: string): Observable<boolean> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.get<boolean>(`${this.baseUrl}/${userId}/status`, { headers });
    }
     
    enableuser(userId: string): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.post(`http://localhost:8081/api/v1/auth/enable/${userId}`, {}, { headers });
    }

    logout(userId: string): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      const params = new HttpParams().set('userId', userId); // Setting userId as a query parameter
  
      return this.http.post(`${this.baseUrl}/logout`, {}, { headers, params });
    }
    
} 
