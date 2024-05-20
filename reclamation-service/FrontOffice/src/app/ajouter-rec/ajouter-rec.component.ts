import { Component } from '@angular/core';
import { Reclamation } from '../reclamation';
import { ReclamationService } from '../reclamation.service';
import { Router } from  '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TypeRecService } from '../type-rec.service';
import { TypeRec } from '../typeRec';

@Component({
  selector: 'app-ajouter-rec',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './ajouter-rec.component.html',
  styleUrl: './ajouter-rec.component.css'
})
export class AjouterRecComponent{
  recs: Reclamation[] = [];
  types: TypeRec[] = [];
  rec: Reclamation = new Reclamation('','','','','',0,'',new Date());



  constructor(private reclamationService :ReclamationService,private typeService :TypeRecService,private router: Router ){}
  ngOnInit(): void {
    this.getType();

  }
  ajouterRec(){
    this.reclamationService.ajouterReclamation(this.rec).subscribe();
    this.router.navigate(['/Reclamations']);

  }
  
  getRec(){
    this.reclamationService.getReclamation().subscribe(data => {
      this.recs = data;
    });
}
getType(){
  this.typeService.getType().subscribe(data => {
    this.types = data;
  });
}
}
