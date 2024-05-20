import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from '../Models/panier';
import { Product } from '../Models/product';
import { Payment } from '../Models/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private panierKey = 'panier';
  private apiUrl = 'http://localhost:8185/api/payments'; // L'URL de votre endpoint de paiement sur votre backend Spring Boot

  constructor(private http: HttpClient) { }

  ajouterAuPanier(produit: Product, quantite: number): void {
    let panier: Panier[] = JSON.parse(localStorage.getItem(this.panierKey) || '[]');
    let produitExist = false;
    for (let item of panier) {
      if (item.produit._id === produit._id) {
        item.quantite += quantite;
        produitExist = true;
        break;
      }
    }
    if (!produitExist) {
      panier.push({ produit, quantite });
    }

    localStorage.setItem(this.panierKey, JSON.stringify(panier));
  }

  getPrixTotalDuPanier(): number {
    let panier: Panier[] = JSON.parse(localStorage.getItem(this.panierKey) || '[]');
    let prixTotal = 0;
    for (let item of panier) {
      if (item.produit.price !== undefined) {
        prixTotal += item.produit.price * item.quantite;
      }
    }
    return prixTotal;
  }

  viderPanier(): void {
    localStorage.removeItem(this.panierKey);
  }

  getPanier(): Panier[] {
    return JSON.parse(localStorage.getItem(this.panierKey) || '[]');
  }

  supprimerDuPanier(index: number): void {
    let panier: Panier[] = JSON.parse(localStorage.getItem(this.panierKey) || '[]');
    panier.splice(index, 1);
    localStorage.setItem(this.panierKey, JSON.stringify(panier));
  }
  supprimerItemDuPanier(index: number): void {
    let panier: Panier[] = JSON.parse(localStorage.getItem(this.panierKey) || '[]');
    if (index >= 0 && index < panier.length) {
      panier.splice(index, 1);
      localStorage.setItem(this.panierKey, JSON.stringify(panier));
    }
  }
  processPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }
  // sendPaymentInfo(token: any, amount: number): Observable<any> {
  //   const paymentData = { token, amount };
  //   return this.http.post<any>(this.apiUrl, paymentData);
  // }
  // sendPaymentInfo(token: any, amount: number, panier: Panier[]): Observable<any> {
  //   const body = {
  //     token: token,
  //     amount: amount,
  //     panier: panier
  //   };
  //   return this.http.post<any>(this.apiUrl, body);
  // }
  sendPaymentInfo(paymentInfo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, paymentInfo);
  }
  getCommandesByProductId(productId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8185/api/related-products/${productId}`);
  }
  updateProductQuantities(cartItems: any[]): Observable<void> {
    return this.http.put<void>('http://localhost:8185/api/v1/product/updateProductQuantities', cartItems);
  }
}
