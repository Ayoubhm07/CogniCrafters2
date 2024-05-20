import { Component ,AfterViewInit} from '@angular/core';
import Quill from 'quill';
import Choices from 'choices.js'; // Si vous utilisez également Choices.js
import flatpickr from 'flatpickr';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements AfterViewInit{
  constructor() { }
  ngAfterViewInit(): void {
    if (document.getElementById('edit-deschiption-edit')) {
      var quill = new Quill('#edit-deschiption-edit', {
        theme: 'snow' // Specify theme in configuration
      });
    };
    const categoryElement = document.getElementById('choices-category-edit');

    if (categoryElement) {
      var element = document.getElementById('choices-category-edit');
      const example = new Choices(categoryElement, {
        searchEnabled: false
      });
    };
    const choices_color_edit = document.getElementById('choices-color-edit');

    if (choices_color_edit) {
      var element = document.getElementById('choices-color-edit');
      const example = new Choices(choices_color_edit, {
        searchEnabled: false
      });
    };
    const choices_currency_edit = document.getElementById('choices-currency-edit');

    if (choices_color_edit) {
      var element = document.getElementById('choices-currency-edit');
      const example = new Choices(choices_color_edit, {
        searchEnabled: false
      });
    };
    const choices_tags_edit = document.getElementById('choices-tags-edit');

    if (choices_tags_edit) {
      var tags = document.getElementById('choices-tags-edit');
      const examples = new Choices(choices_tags_edit, {
        removeItemButton: true
      });

      examples.setChoices(
        [{
            value: 'One',
            label: 'Expired',
            disabled: true
          },
          {
            value: 'Two',
            label: 'Out of Stock',
            selected: true
          }
        ],
        'value',
        'label',
        false,
      );
    }
}
}
