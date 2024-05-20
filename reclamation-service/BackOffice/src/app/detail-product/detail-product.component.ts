import { Component,AfterViewInit } from '@angular/core';
import Quill from 'quill';
import Choices from 'choices.js'; // Si vous utilisez également Choices.js
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements AfterViewInit {
  constructor() { }
  ngAfterViewInit(): void {
    const choiceQuantity = document.getElementById('choices-quantity');
  if (choiceQuantity) {
    var element = document.getElementById('choices-quantity');
    const example = new Choices(choiceQuantity, {
      searchEnabled: false,
      itemSelectText: ''
    });
  };
  const choicematerial = document.getElementById('choices-material')

  if (choicematerial) {
    var element = document.getElementById('choices-material');
    const example = new Choices(choicematerial, {
      searchEnabled: false,
      itemSelectText: ''
    });
  };
  const choicescolor = document.getElementById('choices-colors')
  if (choicescolor) {
    var element = document.getElementById('choices-colors');
    const example = new Choices(choicescolor, {
      searchEnabled: false,
      itemSelectText: ''
    });
  };



}
}
