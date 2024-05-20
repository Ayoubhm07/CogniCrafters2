import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoboflowService {
  private apiUrl = 'https://classify.roboflow.com/';
  private apiKey = '5EIbHnBtfbRwPXCBHGmh';
  private model = 'autisme-d9qx1'; // Modèle par défaut
  private version = '4'; // Version par défaut

  constructor(private http: HttpClient) { }

  // Méthode pour effectuer l'inférence en utilisant l'API Roboflow
  infer(image: File | string) {
    const url = `${this.apiUrl}${this.model}/${this.version}?api_key=${this.apiKey}`;

    // Vérifiez l'image et créez les données FormData en conséquence
    const formData = new FormData();
    if (image instanceof File) {
      formData.append('file', image);
    } else {
      formData.append('image', image);
    }

    // Effectuez la requête POST vers l'URL de l'API Roboflow
    return this.http.post(url, formData);
  }
}