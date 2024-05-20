import { Component ,AfterViewInit} from '@angular/core';
import Quill from 'quill';
import Choices from 'choices.js'; // Si vous utilisez également Choices.js
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements AfterViewInit{
  constructor() { }
  ngAfterViewInit(): void {

    if (document.getElementById('edit-description')) {
      var quill = new Quill('#edit-description', {
        theme: 'snow' // Specify theme in configuration
      });
    };
    // Utilisation de Choices.js
    const categoryElement = document.getElementById('choices-category');
    if (categoryElement) { // Vérification que l'élément existe
      const example = new Choices(categoryElement, {
        searchEnabled: false
      });
    }
    const sizeElement = document.getElementById('choices-sizes');
    if (sizeElement) {
      var element = document.getElementById('choices-sizes');
      const example = new Choices(sizeElement, {
        searchEnabled: false
      });
    }
    const choicecurrecyElement = document.getElementById('choices-currency');
    if (choicecurrecyElement) {
      var element = document.getElementById('choices-currency');
      const example = new Choices(choicecurrecyElement, {
        searchEnabled: false
      });
    };
    const choicetagsElement = document.getElementById('choices-tags');

    if (choicetagsElement) {
      var tags = document.getElementById('choices-tags');
      const examples = new Choices(choicetagsElement, {
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
    if (document.querySelector('.datetimepicker')) {
      flatpickr('.datetimepicker', {
        allowInput: true
      }); // flatpickr
    }
 // Sélectionnez tous les boutons "Next"
 const nextButtons = document.querySelectorAll('.js-btn-next');

 // Ajoutez un gestionnaire d'événements à chaque bouton "Next"
 nextButtons.forEach(button => {
   button.addEventListener('click', () => {
     // Trouvez le panneau actuellement actif
     const currentPanel = button.closest('.multisteps-form__panel');

     // Trouvez le panneau suivant
     const nextPanel = currentPanel?.nextElementSibling;

     // Vérifiez si un panneau suivant existe
     if (nextPanel) {
       // Masquez le panneau actuel
       currentPanel?.classList.remove('js-active');

       // Affichez le panneau suivant
       nextPanel.classList.add('js-active');
     }
   });
 });
 // Sélectionnez tous les boutons "Prev"
const prevButtons = document.querySelectorAll('.js-btn-prev');

// Ajoutez un gestionnaire d'événements à chaque bouton "Prev"
prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Trouvez le panneau actuellement actif
    const currentPanel = button.closest('.multisteps-form__panel');

    // Trouvez le panneau précédent
    const prevPanel = currentPanel?.previousElementSibling;

    // Vérifiez si un panneau précédent existe
    if (prevPanel) {
      // Masquez le panneau actuel
      currentPanel?.classList.remove('js-active');

      // Affichez le panneau précédent
      prevPanel.classList.add('js-active');
    }
  });
});

}
}
