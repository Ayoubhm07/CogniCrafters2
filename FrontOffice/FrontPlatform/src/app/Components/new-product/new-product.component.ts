import { Categories } from './../../Models/categories';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductsService } from '../../Services/Products/products.service';
import { Product } from '../../Models/product';
import Quill from 'quill';
import Choices from 'choices.js';
import { CategoryService } from '../../Services/Products/category.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RoboflowService } from '../../roboflow-service.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'] // Corrigez 'styleUrl' à 'styleUrls'
})
export class NewProductComponent implements AfterViewInit, OnInit {

  selectedImage!: File;
  selectedCategory: string = '';
  selectedCurrency: string = '';
  categories$: Observable<Categories[]> = new Observable<Categories[]>();
  selectedTags: string = '';
  errorOccurred: boolean = false; // Nouvelle propriété pour suivre les erreurs
  productForm!: FormGroup;
  categoryName: string = ''; // Ajoutez la déclaration de la propriété 'categoryName'
  submitted = false;
  // categories: Categories[] = [];
  selectedCategoryId: string = '';
  selectedCategoryName: string = '';
  categories: any[] = [];
  product: Product = {
    name: '',
    description: '',
    etat: false,
    price: 0,
    quantity: 0,
    image: '',
    currency: '',
    sku: '',
    categoryName: '',
    tags: ['inStock', 'outOfStock', 'blackfriday','Sale'] ,// Utilisation correcte des guillemets simples pour les chaînes de caractères
    discount: 0,
    rating:0
  };

  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private categoryService: CategoryService,private http: HttpClient,private roboflowService: RoboflowService) { this.imageForm = this.formBuilder.group({
    method: ['upload'],
    file: [''],
    url: ['']
  });
}
  loadCategories(): void {
    this.categoryService.getAllCategories()
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
    this.loadCategories();
 this.productForm = this.formBuilder.group({
  name: ['', [Validators.required], [this.uniqueProductNameValidator()]],
  sku: ['', [Validators.required], [this.uniqueSkuValidator()]],
  price: ['', [Validators.required, Validators.min(0)]],
  quantity: ['', [Validators.required, Validators.min(0)]],

    });

  }

 // Validator pour vérifier si le nom du produit est unique
 uniqueProductNameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const productName = control.value;
    // Simuler une logique asynchrone de validation du nom du produit unique
    return of(productName === 'ExistingName' ? { uniqueName: true } : null);
  };
}

// Validator pour vérifier si le SKU est unique
uniqueSkuValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const sku = control.value;
    // Simuler une logique asynchrone de validation du SKU unique
    return of(sku === 'ExistingSKU' ? { uniqueSku: true } : null);
  };
}

  updateDescription(event: any) {
    this.product.description = event.target.innerText;
  }
  showNotification(message: String): void {
    // Affichez la notification de succès
    const successToast = document.getElementById('successToast');
    if (successToast) {
      successToast.classList.add('show');
      setTimeout(() => {
        successToast.classList.remove('show');
      }, 5000); // Supprimez la notification après 5 secondes
    }
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.product.image = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  retrieveCategories(): void {
   this.categories$ = this.categoryService.getAllCategories();
  const categoryElement = document.getElementById('category');
   if (categoryElement) {
     this.categories$.subscribe(categories => {
       const choicesData = categories
         .filter(category => category.categoryName !== undefined)
         .map(category => {
           return { value: category.categoryName!, label: category.categoryName! };
         });

       const choices = new Choices(categoryElement, {
         choices: choicesData,
         searchEnabled: false
       });
     });

   }
  }
  sku: string = '';
  name: string = '';
  uniquenessMessage: string = '';
  checkUniqueness(): void {
    if (!this.sku || !this.name) {
      this.uniquenessMessage = 'Please enter both SKU and Name.';
      return;
    }

    this.productService.checkUniqueness(this.sku, this.name)
      .subscribe(isUnique => {
        if (isUnique) {
          this.uniquenessMessage = 'Product is unique.';
        } else {
          this.uniquenessMessage = 'Product is not unique.';
        }
      });
  }
  addProduct(): void {
    if (!this.productForm) {
      console.error("Product form is null.");
      return;
    }

    // Vérifiez d'abord l'unicité du produit
    if (this.product.sku !== undefined && this.product.name !== undefined) {
      this.productService.checkUniqueness(this.product.sku, this.product.name).subscribe({
        next: (isUnique) => {
          if (isUnique) {
            // Si le produit est unique, procédez à son ajout
            this.addProductToDatabase();
          } else {
            alert("SKU and name must be unique.");
          }
        },
        error: (error) => {
          console.error("Error while checking uniqueness:", error);
          alert("An error occurred while checking product uniqueness.");
        }
      });
    } else {
      console.error("SKU or name is undefined.");
      alert("SKU or name is undefined.");
    }

  }

addProductToDatabase() {
  if (!this.productForm) {
      console.error("Product form is null.");
      return;
  }
  const formData = new FormData();
  this.errorOccurred = false;

const editorElement = document.querySelector('.ql-editor');

if (editorElement && editorElement.innerHTML !== null) {
 const descriptionHTML = editorElement.innerHTML;

 formData.append('description', descriptionHTML);
} else {
 console.error('L\'élément Quill.js n\'a pas été trouvé dans le DOM ou il n\'a pas de contenu HTML');
}
  if (this.product.name !== undefined) {
    formData.append('name', this.product.name);
  }
  if (this.product.etat !== undefined) {
    formData.append('etat', this.product.etat.toString());
  }
  if (this.product.price !== undefined) {
    formData.append('price', this.product.price.toString());
  }
  if (this.product.quantity !== undefined) {
    formData.append('quantity', this.product.quantity.toString());
  }
  if (this.selectedImage !== undefined) {
    formData.append('image', this.selectedImage);
  }
  if (this.selectedCategory !== '') {
    formData.append('categoryName', this.selectedCategory.toString());
  }

  if (this.product.currency !== undefined) {
    formData.append('currency', this.product.currency.toString());
  }
  if (this.product.sku !== undefined) {
    formData.append('SKU', this.product.sku.toString());
  }
  if (this.product.tags !== undefined) {
    formData.append('tags', this.selectedTags);
  }
  if (this.product.discount !== undefined) {
    formData.append('discount', this.product.discount.toString());
  }
  if (this.product.rating !== undefined) {
    formData.append('rating', this.product.rating.toString());
  }
this.productService.create(formData).subscribe({
      next: (res) => {
          console.log("Product added successfully:", res);
          this.submitted = true;
          this.showNotification("Product added successfully.");
      },
      error: (error) => {
          console.error("Error while adding product:", error);
          this.errorOccurred = true;
          this.showNotification("An error occurred while adding the product.");
      }
  });
}

imageForm!:FormGroup;
  inferenceResult: any;
  model: string = "autisme-d9qx1";
  version: string = "3";
  apiKey: string = "5EIbHnBtfbRwPXCBHGmh";
  isProductForAutistic: boolean = false;
  loading: boolean = false;

  infer() {
    if (!this.selectedImage) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    this.loading = true; // Afficher le loader

    this.roboflowService.infer(this.selectedImage).subscribe(
      (response: any) => {
        if (response.predicted_classes && response.predicted_classes.length > 0) {
          this.isProductForAutistic = true;
          alert('L\'image est un produit pour l\'autiste.');
        } else {
          this.isProductForAutistic = false;
          alert('L\'image n\'est pas un produit pour l\'autiste.');
        }
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'inférence :', error);
        this.isProductForAutistic = false;
      }
    ).add(() => {
      this.loading = false; // Masquer le loader lorsque la requête est terminée
    });
  }




onCategoryChange(categoryId: string, event: any) {
  if (event && event.target && event.target.value) {
    this.selectedCategoryId = event.target.value;
  }
  const selectedCategory = this.categories.find(category => category._id === categoryId);
  if (selectedCategory) {
    this.selectedCategoryName = selectedCategory.categoryName;
  }
}
  newProduct(): void {
    this.submitted = false;
    this.product = {
    name: '',
    description: '',
    etat: false,
    price :0,
    quantity:0,
    image :'',
    currency : '',
    categoryName: '',

    tags: ['inStock', 'outOfStock', 'blackfriday','Sale'] ,
    discount: 0,
    rating:0,
    };
  }
  ngAfterViewInit(): void {

    if (document.getElementById('edit-description')) {
      var quill = new Quill('#edit-description', {
        theme: 'snow'
      });
    };
    const choicecurrecyElement = document.getElementById('choices-currency');
    if (choicecurrecyElement) {
      var element = document.getElementById('choices-currency');
      const example = new Choices(choicecurrecyElement, {
        searchEnabled: false
      });
    };
    const choicediscountElement = document.getElementById('choices-dicsount');
    if (choicediscountElement) {
      var element = document.getElementById('choices-discount');
      const example = new Choices(choicediscountElement, {
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
      });
    }
 const nextButtons = document.querySelectorAll('.js-btn-next');
 nextButtons.forEach(button => {
   button.addEventListener('click', () => {
     const currentPanel = button.closest('.multisteps-form__panel');
     const nextPanel = currentPanel?.nextElementSibling;

     if (nextPanel) {
       currentPanel?.classList.remove('js-active');

       nextPanel.classList.add('js-active');
     }
   });
 });
const prevButtons = document.querySelectorAll('.js-btn-prev');

prevButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentPanel = button.closest('.multisteps-form__panel');
    const prevPanel = currentPanel?.previousElementSibling;
    if (prevPanel) {
      currentPanel?.classList.remove('js-active');
      prevPanel.classList.add('js-active');
    }
  });
});

}
}


