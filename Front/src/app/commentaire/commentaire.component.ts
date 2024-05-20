import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { commentaires } from '../Models/Commentaire';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent {
  articleId!: string;
  commentaire: commentaires = {
    // _id: '',
    contenu: '',
    date_publication: new Date()
    };

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ajouterCommentaire(): void {
    const auteurId = '6608ce19de54123943832981'; // Remplacez par l'ID du patient actuel
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.articleId = id;
      this.articleService.ajouterCommentaire(this.articleId, this.commentaire, auteurId)
        .subscribe(() => {
          console.log('Commentaire ajouté avec succès.');
        }, error => {
          console.error('Erreur lors de l\'ajout du commentaire : ', error);
        });
    } else {
      console.error('Impossible de récupérer l\'ID de l\'article.');
    }
  }
}