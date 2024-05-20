import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductsService } from '../../Services/Products/products.service';
import simpleDatatables from 'simple-datatables';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-liste-product',
  templateUrl: './liste-product.component.html',
  styleUrls: ['./liste-product.component.css'] // Utilisation de styleUrls
})
export class ListeProductComponent implements OnInit ,AfterViewInit{
  product?: Product[];
  searchText: string = ''; // Assurez-vous que searchText est correctement orthographié
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minQuantity: number | undefined;
  maxQuantity: number | undefined;
  filteredProducts: Product[] = [];

  isProductSelected: boolean = false;
  currentPage = 1; // Page actuelle
  pageSize = 10; // Nombre d'articles par page
  totalItems = 0; // Total des articles
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectProduct(product: Product): void {
    this.currentProduct = product;
    this.isProductSelected = true;
  }
  currentProduct: Product = {
    tags: [] // Initialisez tags avec une valeur par défaut
  };
  currentIndex = -1;
name = '';
constructor(private productService: ProductsService) {}
ngOnInit(): void {
  this.retrieveProducts();
}
retrieveProducts(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.productService.getAll().subscribe({
    next: (data) => {
      this.totalItems = data.length;
      this.product = data.slice(startIndex, endIndex);
      this.applyPriceFilter();

    },
    error: (e) => console.error(e)
  });
}
applyPriceFilter() {
  if (!this.product) return; // Vérifie si this.products est défini

  this.filteredProducts = this.product.filter(product => {
    // Vérifier si le produit est défini et si le prix est défini
    if (!product || product.price === undefined) {
      return false; // Ignorer les produits non définis ou sans prix
    }
    // Vérifier le filtre de prix
    return (!this.minPrice || product.price >= this.minPrice) &&
           (!this.maxPrice || product.price <= this.maxPrice);
  });
}

filterProducts(): Product[] {
  if (!this.product) {
    return [];
  }
  if (!this.searchText.trim()) {
    return this.product;
  }
  return this.product.filter(product =>
    product.name && product.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

get totalPages(): number {
  return Math.ceil(this.totalItems / this.pageSize);
}
totalPagesArray(): number[] {
  return Array(this.totalPages).fill(0).map((x, i) => i + 1);
}

setCurrentPage(page: number): void {
  this.currentPage = page;
  this.retrieveProducts();
}

showProductDetails(product: Product): void {
  this.currentProduct = product;
}
refreshList(): void {
  this.retrieveProducts();
  this.currentProduct = { tags: []
  };
  this.currentIndex = -1;
}

setActiveTutorial(products: Product, index: number): void {
  this.currentProduct = products;
  this.currentIndex = index;
}
removeAllProducts(): void {
  this.productService.deleteAll().subscribe({
    next: (res) => {
      console.log(res);
      this.refreshList();
    },
    error: (e) => console.error(e)
  });
}
deleteProduct(productId: string): void {
  if (!productId) {
    console.error("Product ID is undefined or null.");
    return;
  }

  if (confirm('Are you sure you want to delete this product?')) {
    this.productService.delete(productId).subscribe({
      next: () => {
        console.log("Product deleted successfully.");
        this.refreshList();
      },
      error: (error) => {
        console.error("Error deleting product:", error);
      }
    });
  }
}





modifierProduit(produit: any) {
  // Logique pour modifier le produit
  console.log('Modifier le produit : ', produit);
}
searchTitle(): void {
  this.currentProduct = { tags: []};
  this.currentIndex = -1;

  this.productService.findByName(this.name).subscribe({
    next: (data) => {
      this.product = data;
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}

ngAfterViewInit(): void {
  this.paginator.page.subscribe(() => {
    this.currentPage = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.retrieveProducts();
  });
}
}
