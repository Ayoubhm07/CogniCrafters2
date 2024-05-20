import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileManagementService {
  constructor(private http: HttpClient) {}

  uploadFile(bucketName: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`http://localhost:8990/minio/upload/${bucketName}`, formData)
        .pipe(
            catchError((error) => {
                if (error.status === 200) {
                    console.log('File uploaded successfully to Minio');
                    return of('File uploaded successfully to Minio');
                } else {
                    console.error('Error uploading file to Minio', error);
                    return throwError('Error uploading file to Minio');
                }
            })
        );
}

}
