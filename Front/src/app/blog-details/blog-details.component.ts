import { Component,OnInit } from '@angular/core';
import { Article } from '../Models/Article';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { commentaires } from '../Models/Commentaire';
import { CategorieArticle } from '../Models/CategorieArticle';
import { CategorieArticleService } from '../services/categorie-article.service';
import { MyMemoryTranslationService } from '../services/my-memory-translation-service.service';
// import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
    article!: Article;
    articleId!: string;
    commentaires!: commentaires[];
    categoriesArticle: CategorieArticle[] = [];
    liked: boolean = false;
  
  
    constructor(
      private route: ActivatedRoute,
      private articleService: ArticleService,
      private categorieArticleService: CategorieArticleService,
      private translationService: MyMemoryTranslationService // Injectez le service de traduction MyMemory

    ) { }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
          this.articleId = id;
          this.getArticleDetails();
          this.getCommentaires();
        } else {
        }
      });
      
  
    }
  

    getArticleDetails(): void {
      this.articleService.getArticleById(this.articleId)
        .subscribe(article => this.article = article);
    }
  
    getCommentaires(): void {
      this.articleService.getCommentairesByArticleId(this.articleId)
        .subscribe(commentaires => this.commentaires = commentaires);
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
  
  likeArticle(): void {
    this.articleService.likeArticle(this.articleId).subscribe(() => {
      this.article.liked = !this.article.liked;      //  this.getCommentaires();
    });
  }
    // Fonction pour traduire un commentaire
    translateComment(commentaire: commentaires): void {
      // Utilisez le service de traduction MyMemory pour traduire le commentaire
      this.translationService.translate(commentaire.contenu, 'fr', 'en')
        .subscribe(translatedText => {
          // Mettez à jour le contenu du commentaire avec la traduction
          commentaire.translatedContent = translatedText;
        });
    }
  
    }