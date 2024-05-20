import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { TypeRecService } from '../type-rec.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TypeRec } from '../typeRec';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-type-rec',
  standalone: true,
  imports: [CommonModule,NgToastModule,MatDialogModule,FormsModule],
  templateUrl: './type-rec.component.html',
  styleUrl: './type-rec.component.css'
})
export class TypeRecComponent {
  type: TypeRec[] = [];
  user = { name: '', city: '' };
  dialogRef: any;
  types: TypeRec = new TypeRec('','',new Date());
  id: string = ''; // Initialize with an empty string

  @ViewChild('myCityDialog') cityDialog = {} as TemplateRef<TypeRec>;
  @ViewChild('myInfoDialog') infoDialog = {} as TemplateRef<string>;
  @ViewChild('myInfoDialogModify') infoDialogModify = {} as TemplateRef<string>;
  constructor(
    private toast: NgToastService,
    readonly typeRecService: TypeRecService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
    
    ) {
      console.log("---constructor---");

    }
    
  ngOnInit(): void {
   
    this.typeRecService.getTypeRec().subscribe(data => {
      this.type = data;
    });
  }

 onCancelCityDialog() {
  this.dialogRef.close();
}

myInfo = "Namaste to the world!";
 openInfoDialog() {
  const dialogRef = this.dialog.open(this.infoDialog, {
        width: '400px',
    data: this.myInfo,
  });
  
  dialogRef.afterClosed().subscribe(() => {
    console.log('The Info dialog was closed.');
  });
}

openModifyDialog(recs: TypeRec) {
  // Fetch the details of the selected type by its ID
  this.typeRecService.getTypeRecById(recs._id).subscribe(
    (data) => {
      this.types = data;
      
      // Open the modify dialog
      const dialogRef = this.dialog.open(this.infoDialogModify, {
        width: '400px',
        data: this.types, // Pass the fetched type data as data
      });

      // Subscribe to dialog close event
      dialogRef.afterClosed().subscribe(() => {
        console.log('The Info dialog was closed.');
      });
    },
    (error) => {
      console.log(error);
    }
  );
}


// openInfoDialog() {
//   const dialogRef = this.dialog.open(this.infoDialog, {
//     width: '250px',
// data: this.myInfo,
// });

//   dialogRef.afterClosed().subscribe(() => {
//     console.log('The Info dialog was closed.');
//   });

// }

// getRecById(_id: string){
//   this.reclamationService.getReclamationById(_id).subscribe(data => {
//     this.rec = data;
//   });
// }

getRec(){
  this.typeRecService.getTypeRec().subscribe(data => {
    this.type = data;
  });
}
ajouterRec(): void {
  
    this.typeRecService.ajouterTypeRec(this.types).subscribe(() => {
      this.getRec(); // Refresh the list after adding a new type
      this.dialog.closeAll(); // Close the dialog after adding
      // Optionally, you can display a success message using toast
      this.toast.success({detail:"SUCCESS",summary:'Type ajouté avec success', position:'topRight'});
    }, error => {
      console.error('Error while adding type de réclamation:', error);
      // Optionally, you can display an error message using toast
      this.toast.error({detail:"Error",summary:'ERROR', position:'topRight'});
    });

}
showSuccessTopCenter() {
  this.toast.success({detail:"SUCCESS",summary:'Type supprimé avec success', position:'topRight'});
}
deleteRec(_id: string) {
  this.typeRecService.deleteTypeRec(_id)
    .subscribe(
      data => {
this.showSuccessTopCenter()
        this.getRec()
       
              },
      error => console.log(error));
}
updateType(_id: string, updatedType: TypeRec) {


  this.typeRecService.updateTypeRec(_id, updatedType).subscribe(() => {
    this.getRec(); // Refresh the list after adding a new type
    this.dialog.closeAll(); // Close the dialog after adding
    // Optionally, you can display a success message using toast
    this.toast.success({detail:"SUCCESS",summary:'Type modifé avec success', position:'topRight'});
  }, error => {
    console.error('Error while adding type de réclamation:', error);
    // Optionally, you can display an error message using toast
    this.toast.error({detail:"Error",summary:'ERROR', position:'topRight'});
  });
}



}
