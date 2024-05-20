import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileManagementService } from '../../Services/file-management.service';
import { PsychiatristDetailsComponent } from '../psychiatrist-details/psychiatrist-details.component';

@Component({
  selector: 'app-psychiatre',
  templateUrl: './psychiatre.component.html',
  styleUrl: './psychiatre.component.css'
})
export class PsychiatreComponent implements AfterViewInit{
  psychiatrists: User[] = [];
  selectedPsychiatrist: User | null = null;
  @ViewChild(PsychiatristDetailsComponent) psychiatristDetailsComponent!: PsychiatristDetailsComponent;

  constructor(
    private userService: UserService,
    private fileService: FileManagementService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadPsychiatrists();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const titleElement = document.querySelector('.animated-title');
      if (titleElement) {
        titleElement.classList.add('show');
      }
    }, 100); // Delay to ensure the element is fully loaded
  }
 
  loadPsychiatrists(): void {
    this.userService.getPsychiatrists().subscribe({
      next: (psychiatrists) => {
        psychiatrists.forEach((psychiatrist) => {
          if (!psychiatrist.id) {
            console.error('No ID found for the psychiatrist');
            return;
          }
          this.userService.isUserEnabled(psychiatrist.id).subscribe(isEnabled => {
            psychiatrist.isEnabled = isEnabled;
          });
          if (psychiatrist.image && !psychiatrist.image.startsWith('assets')) {
            this.downloadImage('psychiatre.img', psychiatrist.image);
          }
        });
        this.psychiatrists = psychiatrists;
      },
      error: (err) => console.error('Failed to load psychiatrists:', err)
    });
  }

  downloadImage(bucketName: string, fileName: string): void {
    this.fileService.downloadFile(bucketName, "macha.jpg").subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      const index = this.psychiatrists.findIndex(p => p.image === fileName);
      if (index !== -1) {
        this.psychiatrists[index].image = safeUrl as string;
      }
    });
  }
  selectAndShowPsychiatrist(psychiatrist: User): void {
    this.selectedPsychiatrist = psychiatrist;
    this.psychiatristDetailsComponent.showDetails();  // Assuming you have access to this child component instance
    console.log('Selected Psychiatrist:', this.selectedPsychiatrist);
  }

  clearSelectedPsychiatrist(): void {
    this.selectedPsychiatrist = null;
  }

  toggleUserStatus(psychiatrist: User): void {
    if (!psychiatrist.id) {
      console.error('No ID found for the psychiatrist');
      return;
    }
    
    if (psychiatrist.isEnabled) {
      this.userService.disableUser(psychiatrist.id).subscribe(() => {
        psychiatrist.isEnabled = false;
        console.log('User disabled');
        this.loadPsychiatrists();
      });
    } else {
      this.userService.enableuser(psychiatrist.id).subscribe(() => {
        psychiatrist.isEnabled = true;
        console.log('User enabled');
        this.loadPsychiatrists();   
      });
    }
    window.location.reload();
  }
  // deactivatePsychiatrist(psychiatrist: User): void {
    
  
  //   this.userService.disableUser(psychiatrist.id).subscribe({
  //     next: () => {
  //       console.log(`Psychiatrist with ID ${psychiatrist.id} deactivated.`);
  //       this.loadPsychiatrists();
  //     },
  //     error: (err) => {
  //       console.error('Failed to deactivate psychiatrist:', err);
  //     }
  //   });
  // }
}
