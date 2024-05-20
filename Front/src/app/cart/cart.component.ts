import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Panier } from '../Models/panier';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  selectedShippingMethod: string = 'flat_rate';
  panier: Panier[] = [];
  prixTotal: number = 0;
  handler:any = null;


constructor(private cartService: CartService) {}
ngOnInit() {
this.panier = this.cartService.getPanier();
this.prixTotal = this.cartService.getPrixTotalDuPanier();
this.updateCart();
this.loadCartFromLocalStorage(); // Charger le panier depuis le stockage local


  }

  refreshList(): void {

  }
onShippingMethodChange(event: any) {
  this.selectedShippingMethod = event.target.value;
}

incrementQuantity(item: any) {
  item.quantite++;
  this.updateCart();
  this.saveCartToLocalStorage(); // Enregistrer le panier mis à jour dans le stockage local

}
decrementQuantity(item: any) {
  if (item.quantite > 1) {
    item.quantite--;
    this.updateCart();
    this.saveCartToLocalStorage();


  }
}
calculateTotalCartPrice() {
  this.prixTotal = 0;
  for (let item of this.panier) {
    if (item.produit.price !== undefined) {
      this.prixTotal += item.produit.price * item.quantite;
    }
  }
}
removeItem(index: number) {
  this.cartService.supprimerItemDuPanier(index);
  this.panier = this.cartService.getPanier();
  this.updateCart();
}
updateCart() {
  this.prixTotal = this.cartService.getPrixTotalDuPanier();
  this.calculateTotalCartPrice(); // Recalculer le prix total du panier

}
saveCartToLocalStorage() {
  localStorage.setItem('panier', JSON.stringify(this.panier));
}
loadCartFromLocalStorage() {
  const storedPanier = localStorage.getItem('panier');
  if (storedPanier) {
    this.panier = JSON.parse(storedPanier);
    this.updateCart();
  }
}

}
