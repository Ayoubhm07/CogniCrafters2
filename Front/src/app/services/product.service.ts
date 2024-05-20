import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../Models/product';
import { Review } from '../Models/Review';
import { Currency } from './currency';
const baseUrl = 'http://localhost:8185/api/v1/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productToEditSubject: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);
  public productToEdit$: Observable<Product | null> = this.productToEditSubject.asObservable();
  constructor(private http: HttpClient) {
  }
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
getProductsByCategory(categoryId: string): Observable<any> {
  return this.http.get<any>(`http://localhost:8185/api/v1/product/products?categoryId=${categoryId}`);
}

submitRating(productId: string, rating: number): Observable<any> {
  const body = {
    _id: productId,
    rating: rating
  };

  return this.http.post<any>(`${baseUrl}/rating`, body, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

getLocation(ipAddress: string): Observable<any> {

  return this.http.get<any>('http://localhost:8185/api/location/' + ipAddress);
}
private code  = 'http://localhost:8185/api/currencyCode';

getCurrencyCode(country: string): Observable<any> {
  return this.http.get(`${this.code}?country=${country}`);
}



private currencyUrl = 'http://localhost:8185/api/currencies'; // L'URL de votre API Spring
private urlLatestProdcut = 'http://localhost:8185/api/v1/product/latest-products';
getCurrencies(): Observable<Currency[]> {
  return this.http.get<Currency[]>(this.currencyUrl);
}
getLatestProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.urlLatestProdcut);
}
addProductReview(productId: string, reviewData: string): Observable<any> {
  return this.http.post(`http://localhost:8185/api/v1/product/products/${productId}/reviews`, reviewData);
}
getProductReviews(productId: string): Observable<Review[]> {
  const url = `http://localhost:8185/api/v1/product/products/${productId}/reviews`;
  return this.http.get<Review[]>(url);
}
addReview(productId: string, userId: string, review: Review): Observable<Review> {
  return this.http.post<Review>(`http://localhost:8185/api/v1/product/products/${productId}/reviews?userId=${userId}`, review);
}
}
