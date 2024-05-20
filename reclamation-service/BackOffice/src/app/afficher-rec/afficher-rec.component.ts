import { Reclamation } from '../reclamation';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReclamationService } from '../reclamation.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import { NgZone} from '@angular/core'

@Component({
  selector: 'app-afficher-rec',
  templateUrl: './afficher-rec.component.html',
  styleUrl: './afficher-rec.component.css'
})
export class AfficherRecComponent {

  rec: Reclamation[] = [];
  user = { name: '', city: '' };
  dialogRef: any;

  @ViewChild('myCityDialog') cityDialog = {} as TemplateRef<Reclamation>;
  @ViewChild('myInfoDialog') infoDialog = {} as TemplateRef<string>;
    constructor(
    private toast: NgToastService,
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private zone: NgZone
    
    ) {}
 
  ngOnInit(): void {

   this.getRec();
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
