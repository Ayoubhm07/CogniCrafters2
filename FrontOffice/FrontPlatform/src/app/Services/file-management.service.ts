import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileManagementService {
  constructor(private http: HttpClient) {}

  uploadFile(bucketName: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({
    });

    return this.http.post(`http://localhost:8990/minio/upload/${bucketName}`, formData, { headers });
  }

  downloadFile(bucketName: string, fileName: string): Observable<Blob> {
    if (!fileName) {
      throw new Error("Filename cannot be empty");
    }
    const url = `http://localhost:8990/minio/download/${bucketName}/${fileName}`;
    return this.http.get<Blob>(url, { responseType: 'blob' as 'json' });
  }
}
