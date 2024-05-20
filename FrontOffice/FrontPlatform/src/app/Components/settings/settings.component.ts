import {  Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { CameraDialogComponent } from '../camera-dialog/camera-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FileManagementService } from '../../Services/file-management.service'; // Ajustez le chemin selon votre structure
import { KeycloakService } from 'keycloak-angular';
import { Sex, User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';
import { getMessaging, getToken} from 'firebase/messaging';
import { environment } from '../../../environments/environment';
import { SmsService } from '../../Services/sms.service';
import { NotificationService } from '../../notification.service';
import { Token } from '@angular/compiler';
import Swal from 'sweetalert2';
import { Session } from '../../Models/session.model';
import { IpLocationService } from '../../Services/ip-location.service';
import * as L from 'leaflet';




@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  email: string = '';
  firstName: string = '';
  lastName: string = '';
  adresse?: string = '';
  sex?: Sex=Sex.Male;
  phone?: number =25703996;
  image?: string = "";
  public fcmToken: string ="";
  token: string= "";
  id:string ="";
  user: any;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  @ViewChild('userAvatar')
  userAvatar!: ElementRef<HTMLImageElement>;
  sessions: Session[] = [];

  showButtons = false;
  currentPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;
  passwordStrength: number = 0;
  passwordStrengthText: string = '';

  toggleButtons() {
    this.showButtons = !this.showButtons;
  }

  constructor(private ipLocationService:IpLocationService ,private notificationService: NotificationService,private smsService: SmsService,private userService: UserService,public dialog: MatDialog,private fileService: FileManagementService,private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.showWelcomeAssistant();

    try {
      this.token = localStorage.getItem('token') as string;
      if (!this.token) {
        console.error('No token found in localStorage.');
        return;
      }
      const decodedToken = this.decodeToken(this.token);
      if (!decodedToken) {
        console.error('Failed to decode token.');
        return;
      }
      console.log(decodedToken);
      this.loadUserSessions(decodedToken.sub);
      this.userService.getUserById(decodedToken.sub).subscribe({
        next: (user: any) => {
          this.user = user;
          console.log('User data:', user);
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
          this.adresse = user.attributes.adresse;
          this.sex = user.attributes.sex;
          this.phone = user.attributes.phone;
          if (this.user.attributes.image) {
            this.fetchUserImage('profile', `${this.firstName}${this.lastName}.png`);
          } else {
            console.error('No image filename provided in user attributes.');
          }
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
      this.requestPermission();
    } catch (error) {
      console.error('Failed to initialize component:', error);
    }
  }
  showWelcomeAssistant() {
    const assistant = document.getElementById('welcome-assistant');
    if (assistant) {
      assistant.style.display = 'flex';
      setTimeout(() => {
        assistant.style.opacity = '0';
        setTimeout(() => {
          assistant.style.display = 'none';
        }, 1000); // Match this with the fadeOut animation duration
      }, 5000); // Time before it starts to disappear
    }
  }

  evaluatePasswordStrength(password: string): void {
    let strengthPoints = 0;
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMixedCases = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const hasLength = password.length >= 6;

    if (hasLength) strengthPoints += 25;
    if (hasNumbers) strengthPoints += 25;
    if (hasSpecialChars) strengthPoints += 25;
    if (hasMixedCases) strengthPoints += 25;

    this.passwordStrength = strengthPoints;
    this.updateStrengthText(strengthPoints);
  }

  updateStrengthText(strengthPoints: number) {
    if (strengthPoints <= 33) {
      this.passwordStrengthText = 'Weak';
    } else if (strengthPoints <= 66) {
      this.passwordStrengthText = 'Medium';
    } else {
      this.passwordStrengthText = 'Strong';
    }
  }

  onPasswordChange() {
    this.evaluatePasswordStrength(this.newPassword);
  }
  updatePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'New passwords do not match!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again'
      });
      return;
    }
  
    if (!this.validatePassword(this.newPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'New password does not meet requirements!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again'
      });
      return;
    }
  
    this.userService.updatePassword('ayoub.hammoudi@esprit.tn', this.currentPassword, this.newPassword)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password updated successfully',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update password',
            text: `Error: ${error.error}`,
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
          console.log(error);
        }
      });
  }
  


  validatePassword(password: string): boolean {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinimumLength = password.length >= 6;
    const hasNumbers = (password.match(/\d/g) || []).length >= 2;

    return hasSpecialCharacter && hasMinimumLength && hasNumbers;
}
closeMap(session: any) {
  session.showMap = false;  // Set `showMap` to false to hide the map and the "Cancel" button
}
  public getLocalisation(ip: string, session: any): void {
    this.ipLocationService.getIpLocation(ip).subscribe({
      next: (location) => {
        session.location = `City: ${location.city}, Country: ${location.country}, Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
        session.showMap = true;
        setTimeout(() => this.initMap(location.latitude, location.longitude, ip), 0); // Use setTimeout to wait for the next cycle when the map container is definitely rendered
      },
      error: (error) => {
        console.error('Failed to fetch location', error);
      }
    });
  }
  getMapId(ip: string): string {
  return `map${ip.replace(/\./g, '')}`;
}
  public setMarker(latitude: number, longitude: number, session: any): void {
    if (session.showMap) {
      setTimeout(() => this.initMap(latitude, longitude, session.ip), 100);
    }
  }
  private initMap(latitude: number, longitude: number, ip: string): void {
    const mapId = `map${ip.replace(/\./g, '')}`;
  
    if (document.getElementById(mapId)) {
      const map = L.map(mapId).setView([latitude, longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
  
      L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`Location: ${latitude}, ${longitude}`).openPopup();
    } else {
      console.error('Map container not found');
    }
  }
  
  loadUserSessions(userId: string): void {
    this.userService.getUserSessions(userId).subscribe({
      next: (sessions) => {
        this.sessions = sessions;
      },
      error: (error) => {
        console.error('Error fetching sessions', error);
      }
    });
  }
  fetchUserImage(bucketName: string, fileName: string): void {
    this.fileService.downloadFile(bucketName, fileName).subscribe({
      next: (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
          this.userAvatar.nativeElement.src = reader.result as string;
        };
      },
      error: (error) => console.error('Error downloading file:', error)
    });
  }
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vpaidKey}).then(
      (currentToken) => {
        if (currentToken) {
          console.log("FCM token is here:", currentToken);
          this.fcmToken = currentToken;
        } else {
          console.log("No FCM token found.");
        }
      }
    );
  }
  
  submitForm() {
    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      adresse: this.adresse,
      sex: this.sex,
      phone: this.phone,
      image: this.image,
    };
    
    this.userService.updateUser(this.email, user).subscribe({
      next: (response) => {
        console.log('User updated successfully', response); 
        Swal.fire({
          title: 'Great !',
          text: 'Account Updated Successfully !',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: (error) => console.error('Error updating user', error)
    });
    this.notificationService.sendNotification(this.fcmToken, 'Notification Title', 'Your profile has been updated successfully.')
    .subscribe({
      next: () => console.log('Notification sent successfully'),
      error: (error) => console.error('Error sending notification', error)
    });
  }
  
  openCamera(event:Event): void {
    const dialogRef = this.dialog.open(CameraDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const blob: Blob = result;
        const fileName = `${this.firstName}${this.lastName}.png`;
        const file: File = new File([blob], fileName, { type: "image/png" });        
        this.uploadToServer(file);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.userAvatar.nativeElement.src = reader.result as string;
        }; 
      }
    });
  }

  uploadPhoto(event: MouseEvent): void {
    event.stopPropagation(); 
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Correctly type the target element
    const files = inputElement.files; 
    if (files && files.length > 0) {
        const file = files[0];
        this.uploadToServer(file);
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
                this.userAvatar.nativeElement.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
}


  uploadToServer(file: File) {
    const fileName = file.name; 
    this.fileService.uploadFile('profile', file).subscribe({
      next: (response) => {
        console.log('File uploaded successfully', response);
        this.image = fileName; 
      },
      error: (error) => {
        console.error('Error uploading file', error);
      },
      
    });
  }
}
