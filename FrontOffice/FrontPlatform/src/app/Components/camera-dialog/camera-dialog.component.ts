import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-camera-dialog',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.css']
})
export class CameraDialogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef;
  private stream!: MediaStream;

  constructor(public dialogRef: MatDialogRef<CameraDialogComponent>) {}

  ngAfterViewInit(): void {
    this.startCamera();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(err => console.error(err));
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  capture(): void {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.nativeElement.videoWidth;
    canvas.height = this.videoElement.nativeElement.videoHeight;
    
    const context = canvas.getContext('2d');
    
    if (context !== null) {
      context.drawImage(this.videoElement.nativeElement, 0, 0);
      canvas.toBlob(blob => {
        this.dialogRef.close(blob);
      });
    } else {
      console.error('Unable to get canvas context');
      // Handle the error appropriately
    }
  }
}
