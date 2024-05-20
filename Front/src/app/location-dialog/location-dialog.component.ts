import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrl: './location-dialog.component.css'
})
export class LocationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LocationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}


}
