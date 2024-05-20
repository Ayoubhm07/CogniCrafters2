import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../Models/user.model';
import { FileManagementService } from '../../Services/file-management.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrl: './association.component.css'
})
export class AssociationComponent {
  associations: User[] = [];

  constructor(
    private userService: UserService,
    private fileService: FileManagementService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadassociations();
  }

 
  loadassociations(): void {
    this.userService.getAssociations().subscribe({
      next: (associations) => {
        associations.forEach((association) => {
          if (!association.id) {
            console.error('No ID found for the associations');
            return;
          }
          this.userService.isUserEnabled(association.id).subscribe(isEnabled => {
            association.isEnabled = isEnabled;
          });
          if (association.image && !association.image.startsWith('assets')) {
            this.downloadImage('psychiatre.img', association.image);
          }
        });
        this.associations = associations;
      },
      error: (err) => console.error('Failed to load associationss:', err)
    });
  }

  downloadImage(bucketName: string, fileName: string): void {
    this.fileService.downloadFile(bucketName, "macha.jpg").subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      const index = this.associations.findIndex(p => p.image === fileName);
      if (index !== -1) {
        this.associations[index].image = safeUrl as string;
      }
    });
  }




  toggleUserStatus(associations: User): void {
    if (!associations.id) {
      console.error('No ID found for the associations');
      return;
    }
    
    if (associations.isEnabled) {
      this.userService.disableUser(associations.id).subscribe(() => {
        associations.isEnabled = false;
        console.log('User disabled');
        this.loadassociations();
      });
    } else {
      this.userService.enableuser(associations.id).subscribe(() => {
        associations.isEnabled = true;
        console.log('User enabled');
        this.loadassociations();
      });
    }
    window.location.reload();

  }
}
