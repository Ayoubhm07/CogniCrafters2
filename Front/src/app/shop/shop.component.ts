import { CategproductService } from '../services/categproduct.service';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product';
import { ProductsService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Categories } from '../Models/category';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../services/currency';
import { MatDialog } from '@angular/material/dialog';
changeDetection: ChangeDetectionStrategy.OnPush
import { Loader } from '@googlemaps/js-api-loader';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiServicePythonService } from '../../../ia/ia/api-service-python.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ])
  ]


})

export class ShopComponent {
  product2: Product[] = [];
  latestProducts: Product[] = [];
  product?: Product[];
  searchText: string = '';
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minQuantity: number | undefined;
  maxQuantity: number | undefined;
  filteredProducts: Product[] = [];
  isProductSelected: boolean = false;
  currentPage = 1;
  pageSize = 3;
  totalItems = 0;
  categoryName: string = '';
  selectedCategory: string = '';
  categories$: Observable<Categories[]> = new Observable<Categories[]>();
  exchangeRates: any;
  baseCurrency: string = 'EUR';
  productPrices?: any[];
  regionData: any;
  detectedRegion: string = '';
  sourceCurrency: string = '';
  sourceCountry: string = '';
  targetCurrency: string = '';
  targetCountry: string = '';
  amount: number = 0;
  conversionResult: string = '';
  isLoading: boolean = true;
  constructor(private productService: ProductsService ,private categproductService: CategproductService,private http: HttpClient,private dialog: MatDialog,private apiService: ApiServicePythonService) {

  }

  selectedCategoryId: string = '';
  selectedCategoryName: string = '';
  categories: any[] = [];

  AfficherProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.productService.getAll().subscribe({
      next: (data) => {
        this.product = data.filter((product: Product) => {
          return product.name?.toLowerCase().includes(this.searchText.toLowerCase());
        });

        this.totalItems = this.product.length;

        this.product = this.product.slice(startIndex, endIndex);

      },
      error: (e) => console.error(e)
    });
  }


  onSearchChange(): void {
    this.AfficherProducts();
  }
  loadCategories(): void {
    this.categproductService.getAllCategories()
      .subscribe(
        categories => {
          this.categories = categories;
        },
        error => {
          console.error('Erreur lors du chargement des catégories:', error);
        }
      );
  }

  ngOnInit(): void {
    console.log('Début de la récupération des produits.');
    this.retrieveProducts();
    this.loadCategories();
   // this.AfficherProducts();
   this.detectLocation();
  // this.getExchangeRatesFromApi();
this.getLatestProducts()
this.getPredictions();


  }
  selectCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (data: any[]) => {
        console.log('Données récupérées du service :', data);
        console.log("CategoryId:", categoryId);
this.product = data.filter((product: any) => product.category?._id === categoryId);

        this.product = data.filter((product: any) => product.category?._id === categoryId);
        console.log('Produits filtrés par catégorie :', this.product);
        this.totalItems = this.product.length;
        this.currentPage = 1;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits de la catégorie:', error);
      }
    });
  }
  retrieveProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.productService.getAll().subscribe({
      next: (data) => {
        this.totalItems = data.length;
        this.product = data.slice(startIndex, endIndex);
    },
      error: (e) => console.error(e)
    });
  }



  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
   // this.retrieveProducts();
   this.AfficherProducts();
  }

  // detectLocation() {
  //   // Effectue une requête HTTP pour obtenir l'adresse IP à partir de http://api.ipify.org
  //   this.http.get<any>('http://api.ipify.org/?format=json').subscribe(data => {
  //     console.log('Adresse IP récupérée :', data.ip); // Affiche l'adresse IP récupérée dans la console

  //     // Récupère l'adresse IP à partir des données obtenues
  //     const ipAddress = data.ip;

  //     // Utilise l'adresse IP pour récupérer les informations de localisation via le service productService
  //     this.productService.getLocation(ipAddress).subscribe(location => {
  //       console.log('Localisation récupérée :', location); // Affiche les informations de localisation dans la console

  //       // Enregistre la région détectée si elle est définie
  //       this.detectedRegion = location.region || undefined;
  //       window.alert(`Votre localisation est : ${this.detectedRegion}`);

  //       if (this.detectedRegion) {
  //         // Appel de convertCurrency() avec les paramètres appropriés
  //         this.convertCurrency('USD', 'United States',this.detectedRegion, 20);
  //       }


  //   }, error => {
  //       console.error('Erreur lors de la récupération de la localisation :', error); // Affiche l'erreur dans la console s'il y en a une
  //     });
  //   }, error => {
  //     console.error('Erreur lors de la récupération de l\'adresse IP :', error); // Affiche l'erreur dans la console s'il y en a une
  //   });
  // }
  detectLocation(): void {
    this.http.get<any>('http://api.ipify.org/?format=json').subscribe(data => {
      const ipAddress = data.ip;
      this.http.get<any>('http://free.ipwhois.io/json/' + ipAddress).subscribe(location => {
        this.detectedRegion = location.region || '';
        console.log('Localisation récupérée :', location);
      //  window.alert(`Votre localisation est : ${this.detectedRegion}`);
        const lat = location.latitude;
        const lng = location.longitude;
        this.initMap(lat, lng);
      }, error => {
        console.error('Error retrieving location:', error);
        this.isLoading = false;
      });
    }, error => {
      console.error('Error retrieving IP address:', error);
      this.isLoading = false;
    });
  }
  initMap(lat: number, lng: number): void {
    const loader = new Loader({
      apiKey: 'AIzaSyBi3t8TyZxEoZ-1-sRGRZLJuczImaQtyUw'
    });

    loader.load().then(() => {
      const mapProp = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 15,
      };
      const map = new google.maps.Map(document.getElementById('map')!, mapProp);

      // Ajoutez un marqueur à la position de l'utilisateur avec une animation
      // const marker = new google.maps.Marker({
      //   position: mapProp.center,
      //   map: map,
      //   title: 'Your Location',
      //   animation: google.maps.Animation.DROP // Animation de goutte
      // });

      const marker = new google.maps.Marker({
        position: mapProp.center,
        map: map,
        title: 'Your Location',
        animation: google.maps.Animation.BOUNCE
      });

      this.isLoading = false;
    });
  }

  convertCurrency(sourceCurrency: string, sourceCountry: string,  targetCountry: string, amount: number): void {
    const url = `http://localhost:8089/api/api/convertCurrency?sourceCurrency=${sourceCurrency}&sourceCountry=${sourceCountry}&targetCountry=${targetCountry}&amount=${amount}`;

    this.http.get<string>(url)
      .subscribe(
        (response) => {
          this.conversionResult = response;
        },
        (error) => {
          console.log('Error:', error);
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
  getLatestProducts(): void {
    this.productService.getLatestProducts()
      .subscribe(products => this.latestProducts = products);
  }
  predictions?: any[];
  getPredictions() {
    this.apiService.getPredictions().subscribe(
      (data: any) => {
        this.predictions = data;
        console.log('Predictions:', this.predictions);
      },
      error => {
        console.error('Error fetching predictions:', error);
      }
    );
  }

}
