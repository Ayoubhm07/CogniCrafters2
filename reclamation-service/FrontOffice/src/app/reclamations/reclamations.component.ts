import { Component } from '@angular/core';
import { ReclamationService } from '../reclamation.service';
import { Reclamation } from '../reclamation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reclamations',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,NgToastModule],
  templateUrl: './reclamations.component.html',
  styleUrl: './reclamations.component.css'
})
export class ReclamationsComponent {
  recs: Reclamation[] = [];



  constructor(private reclamationService :ReclamationService,private toast: NgToastService,
    ){}
  ngOnInit(): void {
      this.getRec()
  }
 
  getRec(){
    this.reclamationService.getReclamation().subscribe(data => {
      this.recs = data;
    });
}
showSuccessTopCenter() {
  this.toast.success({detail:"SUCCESS",summary:'Reclamation supprimé avec success', position:'topRight'});
}
deleteRec(_id: string) {
  this.reclamationService.deleteReclamation(_id)
    .subscribe(
      data => {
this.showSuccessTopCenter()
        this.getRec()
       
              },
      error => console.log(error));
}
}
