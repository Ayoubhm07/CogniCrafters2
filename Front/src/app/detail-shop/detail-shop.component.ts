import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Panier } from '../Models/panier';
import { StatutCommande } from '../Models/StatutCommande ';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Review } from '../Models/Review';
import { ApiServicePythonService } from '../../../ia/ia/api-service-python.service';

@Component({
  selector: 'app-detail-shop',
  templateUrl: './detail-shop.component.html',
  styleUrls: ['./detail-shop.component.css']
})
export class DetailShopComponent implements OnInit {
 // quantity: number = 1;
  //selectedStar: number = 0;
  //exchangeRates: any;
 // baseCurrency: string = 'EUR';
  //productPrices?: any[];
  //regionData: any;
  //sourceCurrency: string = '';
 // sourceCountry: string = '';
 // targetCurrency: string = '';
 // targetCountry: string = '';
 // amount: number = 0;
 // productId: string = '';
   //commande: Panier | undefined;

 product: Product | undefined;
 message: string = '';
 rating: number = 0;
  associatedProducts: Product[] = [];
  isLoading: boolean = true;
  conversionResult: string = '';
  quantity: number = 1
  review: Review = new Review();
productId?: string;
userId: string = "65fb0b8965bbd32bfbf31b1a";
reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private http: HttpClient,
    private apiService: ApiServicePythonService
  ) { }

  ngOnInit(): void {
    console.log('Dans ngOnInit');
    this.getProductDetails();
    this.detectLocation();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.cartService.getCommandesByProductId(productId).subscribe(
        (response) => {
          this.associatedProducts = response;
          console.log('Produits associés récupérés avec succès:', this.associatedProducts);
        },
        (error) => {
          console.error('Erreur lors de la récupération des produits associés :', error);
        }
      );
    }

    console.log('ID du produit:', productId);
    if (productId) {
      this.loadProductReviews(productId);
    }    }


  getProductDetails(): void {
    this.isLoading = true;
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId)
        .subscribe(product => {
          if (product) {
            this.product = product;
            if (this.product && this.product.rating) {
              this.rating = this.product.rating;

            }
            this.detectLocation()
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);

          }

        });
    }
  }



detectLocation() {
  this.http.get<any>('http://api.ipify.org/?format=json').subscribe(data => {
    console.log('Adresse IP récupérée :', data.ip);
    const ipAddress = data.ip;
    this.productService.getLocation(ipAddress).subscribe(location => {
      console.log('Localisation récupérée :', location);
      location.region || 'Tunisia';
      if (this.product && this.product.price) {
        this.convertCurrency('USD', 'United States', location.region, this.product.price);
      }
    }, error => {
      console.error('Erreur lors de la récupération de la localisation :', error);
    });
  }, error => {
    console.error('Erreur lors de la récupération de l\'adresse IP :', error);
  });
}
convertCurrency(sourceCurrency: string, sourceCountry: string, targetCountry: string, amount: number): void {
  const url = `http://localhost:8185/api/api/convertCurrency?sourceCurrency=${sourceCurrency}&sourceCountry=${sourceCountry}&targetCountry=${targetCountry}&amount=${amount}`;
  this.http.get(url, { responseType: 'text' })
    .subscribe(
      (response: string) => {
        this.conversionResult = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log('Erreur de conversion de devise:', error.message);
      }
    );
}
convertCurrencyByCountry(baseCurrency: string, baseCountry: string, targetCurrency: string, country: string, amount: number): void {
  this.productService.getCurrencyCode(country).subscribe(
    (response: any) => {
      const countryCode = response.code;
      console.log(`Code de devise pour ${country}: ${countryCode}`);
    },
    (error: any) => {
      console.error(`Erreur lors de la récupération du code de devise pour ${country}:`, error);
    }
  );
}
ajouterAuPanier(productId: string): void {
  if (this.product) {
    console.log('Produit sélectionné :', this.product);
    console.log('Quantité sélectionnée :', this.quantity);

    this.cartService.ajouterAuPanier(this.product, this.quantity);

    this.quantity = 1;
  } else {
    console.error("Le produit n'est pas défini.");
  }
}
incrementQuantity(): void {
  this.quantity++;
}
decrementQuantity(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
// submitReview(productId: string, reviewData: any): void {
//   reviewData.productId = productId;

//   this.http.post(`http://localhost:8185/api/v1/product/products/${productId}/reviews`, reviewData)
//       .subscribe(
//           (response) => {
//               console.log('Review added successfully:', response);
//           },
//           (error) => {
//               console.error('Error adding review:', error);
//           }
//       );
// }
// setRating(rating: number): void {
//   if (this.rating === rating) {
//       this.rating = 0;
//   } else {
//       this.rating = rating;
//       console.log('Rating sélectionné :', rating);

//       if (this.product && this.product._id) {
//           this.productService.submitRating(this.product._id, rating)
//               .subscribe(
//                   (response) => {
//                       console.log('Product rating updated in the database:', response);
//                   },
//                   (error) => {
//                       console.error('Error updating product rating:', error);
//                   }
//               );
//       }
//   }
// }
setRating(rating: number): void {
  if (this.rating === rating) {
    this.rating = 0;
  } else {
    this.rating = rating;
    console.log('Rating sélectionné :', rating);
  }
}

onSubmit(productId: string, review: Review) {
  review.productId = productId;
  review.rating = this.rating;
  if (productId && this.userId) {
    this.productService.addReview(productId, this.userId, review)
      .subscribe(
        response => {
          console.log('Comment added:', review.comment);
          console.log('Product ID:', productId);
          console.log('User ID:', this.userId);
          console.log('Review added successfully', response);
        },
        error => {
          console.error('Error adding review', error);
        }
      );
  } else {
    console.error('productId or userId is undefined');
  }
}

loadProductReviews(productId: string): void {
  this.productService.getProductReviews(productId).subscribe(
    (reviews: Review[]) => {
      this.reviews = reviews;
      console.log('Reviews:', this.reviews);
    },
    (error) => {
      console.error('Error loading reviews:', error);
    }
  );
}

}





