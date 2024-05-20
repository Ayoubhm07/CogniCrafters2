import { CommonModule, DatePipe } from '@angular/common';
import { Component, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { ReclamationService } from '../reclamation.service';
import { Reclamation } from '../reclamation';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [CommonModule,NgToastModule,MatDialogModule],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  rec: Reclamation[] = [];
  user = { name: '', city: '' };
  dialogRef: any;

  @ViewChild('myCityDialog') cityDialog = {} as TemplateRef<Reclamation>;
  @ViewChild('myInfoDialog') infoDialog = {} as TemplateRef<string>;
  constructor(
    private toast: NgToastService,
    readonly reclamationService: ReclamationService,
    public dialog: MatDialog,
    
    
    ) {
      console.log("---constructor---");

    }
    ngOnInit(): void {
        this.reclamationService.getReclamation().subscribe(data => {
          this.rec = data;
        });
 }
 onCancelCityDialog() {
  this.dialogRef.close();
}

myInfo = "Namaste to the world!";
//  openInfoDialog() {
//   const dialogRef =this.zone.run(() => this.dialog.open(this.infoDialog, {
//     data: this.myInfo,
//     panelClass: 'custom-dialog-container' // Add a custom CSS class for styling
//   }));
//   dialogRef.afterClosed().subscribe(() => {
//     console.log('The Info dialog was closed.');
//   });
// }


openInfoDialog(_id: string) {
this.reclamationService.getReclamationById(_id).subscribe(data => {
  const dialogRef = this.dialog.open(this.infoDialog, {
    width: '250px',
    data: data.description // Pass the description as data to the dialog
  });

  dialogRef.afterClosed().subscribe(() => {
    console.log('The Info dialog was closed.');
  });
});
}

getRecById(_id: string){
  this.reclamationService.getReclamationById(_id).subscribe(data => {
    this.rec = data;
  });
}

getRec(){
  this.reclamationService.getReclamation().subscribe(data => {
    this.rec = data;
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
