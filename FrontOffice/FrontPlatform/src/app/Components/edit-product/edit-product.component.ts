import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Choices from 'choices.js';
import Quill from 'quill';
import { ProductsService } from '../../Services/Products/products.service';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit,AfterViewInit{

  productId: string | null = null; // Initialisation à null
  product: Product | undefined;
  selectedProduct: any;
  formData: any = {}; // Déclaration de la propriété formData

  constructor(private route: ActivatedRoute, private productService: ProductsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id']; // Assurez-vous que 'id' correspond au paramètre dans votre route
      console.log('Product ID:', this.productId); // Vérifiez la valeur de productId dans la console
    });
    this.getProductDetails();

  }
  getProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId)
        .subscribe(product => this.product = product);
    }
  }
  editProduct(productId: any) {
    const newData = { /* les nouvelles données à mettre à jour */ };
    // Appelez votre service de produit pour mettre à jour le produit avec l'ID fourni et les nouvelles données
    this.productService.update(productId, newData).subscribe(
      (response) => {
        // Gérez la réponse de la mise à jour du produit si nécessaire
        console.log("Product updated successfully:", response);
      },
      (error) => {
        // Gérez les erreurs de mise à jour du produit
        console.error("Error updating product:", error);
      }
    );
  }


  onSubmit() {
    // Utilisez this.productId et this.formData pour envoyer les données de mise à jour au service ProductService
    this.productService.update(this.productId, this.formData).subscribe(
      (response) => {
        // Traitez la réponse ou effectuez d'autres actions après la mise à jour réussie du produit
      },
      (error) => {
        // Gérez les erreurs en cas d'échec de la mise à jour du produit
      }
    );
  }
  loadProductDetails(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        (data: any) => {
          this.product = data; // Stockez les détails du produit dans la variable product
        },
        error => {
          console.log('Error loading product details:', error);
        }
      );
    } else {
      console.log('Product ID is null or undefined');
    }
  }

  ngAfterViewInit(): void {

    if (document.getElementById('edit-deschiption-edit')) {
      var quill = new Quill('#edit-deschiption-edit', {
        theme: 'snow' // Specify theme in configuration
      });
    };
    const choicecategoryElement = document.getElementById('choices-category-edit');
    if (choicecategoryElement) {
      var element = document.getElementById('choices-category-edit');
      const example = new Choices(choicecategoryElement, {
        searchEnabled: false
      });
    };
    const choicecurrecyElement = document.getElementById('choices-color-edit');
    if (choicecurrecyElement) {
      var element = document.getElementById('choices-color-edit');
      const example = new Choices(choicecurrecyElement, {
        searchEnabled: false
      });
    };
    const choicecolorElement = document.getElementById('choices-color-edit');
    if (choicecolorElement) {
      var element = document.getElementById('choices-color-edit');
      const example = new Choices(choicecolorElement, {
        searchEnabled: false
      });
    };
    const choicesizesElement = document.getElementById('choices-currency-edit');
    if (choicesizesElement) {
      var element = document.getElementById('choices-currency-edit');
      const example = new Choices(choicesizesElement, {
        searchEnabled: false
      });
    };
    const choicetagsElement = document.getElementById('choices-tags-edit');
    if (choicetagsElement) {
      var element = document.getElementById('choices-tags-edit');
      const example = new Choices(choicetagsElement, {
        searchEnabled: false
      });
    };
  }
}
