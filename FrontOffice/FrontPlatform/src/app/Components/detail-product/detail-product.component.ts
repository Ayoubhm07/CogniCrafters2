import { Component, Input } from '@angular/core';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  @Input() currentProduct: any; // Remplacez `any` par le type approprié de votre objet de produit
}
