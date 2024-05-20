import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../Models/user.model';
import { FileManagementService } from '../../Services/file-management.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clients: User[] = [];

  constructor(
    private userService: UserService,
    private fileService: FileManagementService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadClients();
  }

 
  loadClients(): void {
    this.userService.getClients().subscribe({
      next: (clients) => {
        clients.forEach((client) => {
          if (!client.id) {
            console.error('No ID found for the clients');
            return;
          }
          this.userService.isUserEnabled(client.id).subscribe(isEnabled => {
            client.isEnabled = isEnabled;
          });
          if (client.image && !client.image.startsWith('assets')) {
            this.downloadImage('psychiatre.img', client.image);
          }
        });
        this.clients = clients;
      },
      error: (err) => console.error('Failed to load clientss:', err)
    });
  }

  downloadImage(bucketName: string, fileName: string): void {
    this.fileService.downloadFile(bucketName, "macha.jpg").subscribe(blob => {
      const objectURL = URL.createObjectURL(blob);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      const index = this.clients.findIndex(p => p.image === fileName);
      if (index !== -1) {
        this.clients[index].image = safeUrl as string;
      }
    });
  }




  toggleUserStatus(clients: User): void {
    if (!clients.id) {
      console.error('No ID found for the clients');
      return;
    }
    
    if (clients.isEnabled) {
      this.userService.disableUser(clients.id).subscribe(() => {
        clients.isEnabled = false;
        console.log('User disabled');
        this.loadClients();
      });
    } else {
      this.userService.enableuser(clients.id).subscribe(() => {
        clients.isEnabled = true;
        console.log('User enabled');
        this.loadClients();
      });
    }
    window.location.reload();

  }
}
