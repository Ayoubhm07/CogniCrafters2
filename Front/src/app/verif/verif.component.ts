import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileManagementService } from '../services/file-management.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-verif',
  templateUrl: './verif.component.html',
  styleUrl: './verif.component.css'
})
export class VerifComponent {
  @ViewChild('videoElement')
  videoElement!: ElementRef;
  @ViewChild('imageInput')
  imageInput!: ElementRef;
  token: string ="";
  userid: string ="";
  constructor(private filemanagementService : FileManagementService,private http: HttpClient,private userService: UserService,private smsService : SmsService) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'To Verify Your Account',
      html: `
        <img src="../../assets/assets/img/assistant.png" alt="Assistant" style="width: 100px; height: auto; margin-bottom: 20px;">
        <p>To Verify your account you need to complete these steps:</p>
        <p>1. Upload a picture of your CIN</p>
        <p>2. Upload your own picture</p>
        <p>3. Upload your diploma</p>
        <p>4. Complete the other information</p>
      `,
      confirmButtonText: 'Got it!',
      width: '600px',
      padding: '3em',
      backdrop: `
        rgba(0,0,123,0.4)
        url("./assets/img/assistant.jpg")
        left top
        no-repeat
      `
    });
    this.token = localStorage.getItem('token') as string; 
    const decodedToken = this.decodeToken(this.token);
    console.log(decodedToken);
    this.userid=decodedToken.sub;
   
  }
  showNotification() {
    Swal.fire({
      title: 'Vérification d\'identité',
      text: 'Veuillez prendre une photo avec votre carte d\'identité pour vérification.',
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showCameraContainer();
      }
    });
  }
  showCameraContainer() {
    const cameraContainer = document.getElementById('cameraContainer');
    if (cameraContainer) {
      cameraContainer.style.display = 'block';
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const video = this.videoElement.nativeElement;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.log("Erreur d'accès à la caméra: " + err);
        });
    }
  }
  takePhoto() {

    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png'); 
      console.log('Image capturée:', imageUrl);
      video.srcObject.getTracks().forEach((track: { stop: () => any; }) => track.stop());
      this.hideCameraContainer();
    } else {
      console.error("Le contexte du canvas n'a pas pu être récupéré.");
    }
  }

  cancel() {
    const video = this.videoElement.nativeElement;
    video.srcObject.getTracks().forEach((track: { stop: () => any; }) => track.stop());
    this.hideCameraContainer();
  }

  hideCameraContainer() {
    const cameraContainer = document.getElementById('cameraContainer');
    if (cameraContainer) {
      cameraContainer.style.display = 'none';
    }
  }
  
  onSubmit() {
    console.log(this.userid);
    const imageFile = this.imageInput.nativeElement.files[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile, imageFile.name);
  
      this.http.post<any>(' http://localhost:5200/detect_keywords', formData).subscribe(
        (response) => {
          console.log(response);
          if (response.verif === true) {
           
            const smsRequest = {
              message: 'Merci pour vérifier votre identité ! Vous pouvez maintenant accéder à votre espace psychiatre !',
              phoneNumber: '+21625703996'
            };
            this.smsService.sendSms(smsRequest).subscribe(
              () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Succès',
                  text: 'SMS envoyé avec succès au psychiatre.'
                });
              },
              (error) => {
                console.error('Erreur lors de l\'envoi du SMS : ', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: 'Une erreur s\'est produite lors de l\'envoi du SMS.'
                });
              }
            );
            this.userService.updateUserRole(this.userid, 'psychiatre').subscribe(
              () => {
               console.log("updated");
               window.location.href = 'http://localhost:4204';

              }
            );
          }else {
            console.log('Aucun mot-clé trouvé dans l\'image.');
          }
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de la vérification de l\'image.'
          });
        }
      );
    } else {
      console.error('Aucune image sélectionnée.');
    }
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
  
}
