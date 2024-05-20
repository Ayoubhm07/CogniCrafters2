import { Component ,OnInit} from '@angular/core';
import { CategorieArticleService } from '../services/categorie-article.service';
import {CategorieArticle} from '../Models/CategorieArticle';
import { Article } from '../Models/Article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  categoriesArticle: CategorieArticle[] = [];
  article: Article[] = [];


  constructor(
    private categorieArticleService: CategorieArticleService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getCategorieArticle();
    this.getArticles();
  }

  getCategorieArticle(): void {
    this.categorieArticleService.getCategorieArticle()
      .subscribe({
        next: (data) => {
          this.categoriesArticle = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getArticles(): void {
    this.articleService.getArticle()
      .subscribe({
        next: (data) => {
          this.article = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  getImageUrl(article: Article): string {
    // Récupérez le nom de l'image à partir de l'objet Article
    const imageName = article.image;
    // Remplacez cet URL par l'URL de base de votre serveur où les images sont stockées
    const baseUrl = 'file:///C:/Users/MSI/Desktop/CogniCrafters_User-BackPlatform/src/main/resources/uploads/'; // Remplacez 'http://example.com/uploads/' par votre URL de base
  
    // Si le nom de l'image est défini et non vide
    if (imageName && imageName.trim() !== '') {
      // Construisez l'URL complète en concaténant le nom de l'image avec l'URL de base
      return baseUrl + imageName;
    } else {
      // Si le nom de l'image n'est pas défini ou vide, retournez une URL par défaut ou vide selon votre logique
      return ''; // ou retournez une URL par défaut pour une image manquante
    }
  }
}