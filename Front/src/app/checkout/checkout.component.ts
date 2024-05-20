import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Panier } from '../Models/panier';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  prixTotal: number = 0;
  handler:any = null;
  panier: Panier[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.loadStripe();
    this.getCart();
    this.loadCartFromLocalStorage();
    this.updateCart();
  }
  pay(amount: any) {
    this.handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OrhI0AtGYUPmAXtuEkZG1NJF5LnuUPNcctPv6LF6tm38N35d0DmgEHzM07bjCAdhwR9RyUolPEa2nOvvbaZDgex00tLWAKcH9',
      locale: 'auto',
      token: (token: any) => {
        console.log(token);
        alert('Token Created!!');
      }
    });

    this.handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
    });
  }
  payer(amount: any) {
    const panier = this.cartService.getPanier(); // Récupérer le panier depuis le service
    const paymentInfo = {
      token: null, // Le token sera rempli par Stripe
      panier: panier,
      total: amount // Vous pouvez également envoyer le montant total si nécessaire
    };
    console.log("Payment Info:", paymentInfo); // Afficher le contenu de paymentInfo dans la console

    this.handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OrhI0AtGYUPmAXtuEkZG1NJF5LnuUPNcctPv6LF6tm38N35d0DmgEHzM07bjCAdhwR9RyUolPEa2nOvvbaZDgex00tLWAKcH9',
      locale: 'auto',
      token: (token: any) => {
        paymentInfo.token = token; // Remplir le token généré par Stripe
        this.sendPaymentInfo(paymentInfo); // Envoyer les informations de paiement au backend
      }
    });

    this.handler.open({
      name: 'Nom de votre site',
      description: 'Description de votre paiement',
      amount: amount * 100, // Montant en centimes
    });
  }

  sendPaymentInfo(paymentInfo: any) {
    // Appeler votre service pour envoyer les informations de paiement au backend
    this.cartService.sendPaymentInfo(paymentInfo)
      .subscribe(
        (response) => {
          // Traitement réussi côté backend
          alert('Paiement réussi !');
          this.onPurchaseSuccess(paymentInfo.panier); // Mettre à jour le stock des produits
          this.viderPanier();
        },
        (error) => {
          // Gestion des erreurs
          alert('Échec du paiement. Veuillez réessayer plus tard.');
        }
      );
  }

  onPurchaseSuccess(cartItems: any[]) {
    this.cartService.updateProductQuantities(cartItems).subscribe(
      () => {
        console.log('Quantités des produits mises à jour avec succès.');
        // Autres actions après la mise à jour réussie
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des quantités des produits :', error);
        // Gestion des erreurs
      }
    );
  }


  getCart(): void {
    this.panier = this.cartService.getPanier();
    console.log("voici votre order",this.panier)
  }


  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51OrhI0AtGYUPmAXtuEkZG1NJF5LnuUPNcctPv6LF6tm38N35d0DmgEHzM07bjCAdhwR9RyUolPEa2nOvvbaZDgex00tLWAKcH9',
          locale: 'auto',
          token: (token: any) => {
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }
  updateCart() {
    this.panier = this.cartService.getPanier();
    this.calculateTotalCartPrice();
  }

  calculateTotalCartPrice() {
    this.prixTotal = this.cartService.getPrixTotalDuPanier();
  }

  loadCartFromLocalStorage() {
    this.updateCart();
  }
  viderPanier() {
    this.cartService.viderPanier();
    this.updateCart(); // Mettre à jour le panier après l'avoir vidé
  }
}
