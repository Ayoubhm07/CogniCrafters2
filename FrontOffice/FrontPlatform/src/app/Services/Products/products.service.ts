import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../Models/product';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'http://localhost:8185/api/v1/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productToEditSubject: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);
  public productToEdit$: Observable<Product | null> = this.productToEditSubject.asObservable();
  constructor(private http: HttpClient) {}
  setProductToEdit(product: Product) {
    this.productToEditSubject.next(product);
  }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8185/api/v1/product/getAll`);
  }
  getDetails(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/getProductDetail/${id}`);
  }
  create(data: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/save`, data);
  }
  getProductById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/product/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/edit/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByName(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/chercher?name=${name}`);
}
checkUniqueness(sku: string, name: string): Observable<boolean> {
  return this.http.get<boolean>(`http://localhost:8185/api/v1/product/checkUniqueness?sku=${sku}&name=${name}`);
}


}
