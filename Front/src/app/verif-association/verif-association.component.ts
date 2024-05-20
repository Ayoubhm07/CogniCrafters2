import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileManagementService } from '../services/file-management.service';
import { SmsService } from '../services/sms.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verif-association',
  templateUrl: './verif-association.component.html',
  styleUrl: './verif-association.component.css'
})
export class VerifAssociationComponent implements OnInit{
  @ViewChild('taxIdInput') taxIdInput!: ElementRef;

  token: string ="";
  userid: string ="";
  associationForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    phone: new FormControl(''),
    logo: new FormControl(''),
    taxId: new FormControl('')
  });
  constructor(private fileService : FileManagementService,private http: HttpClient,private userService: UserService,private smsService : SmsService) { }
  ngOnInit(): void {
    Swal.fire({
        title: 'To Verify Your Account',
        html: `
          <img src="../../assets/assets/img/assistant.png" alt="Assistant" style="width: 100px; height: auto; margin-bottom: 20px;">
          <p>To Verify your account you need to complete these steps:</p>
          <p>1. Upload a picture of your Association's Fiscal Card</p>
          <p>2. Complete the other information</p>
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

  submitForm() {
    const taxIdFile: File = this.taxIdInput.nativeElement.files[0];

    if (taxIdFile) {
        const formData = new FormData();
        formData.append('image', taxIdFile, taxIdFile.name);        
        this.http.post<any>('http://localhost:5200/verif_association', formData).subscribe(
            (response) => {
                console.log(response);
                if (response.verif === true) {
                            const smsRequest = {
                                message: 'Merci pour vérifier votre identité ! Vous pouvez maintenant accéder à votre espace association !',
                                phoneNumber: '+21625703996'
                            };
                            this.smsService.sendSms(smsRequest).subscribe(
                                () => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Succès',
                                        text: 'SMS envoyé avec succès.'
                                    });
                                    window.location.href = 'http://localhost:4203';

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
                            this.userService.updateUserRole(this.userid, 'association').subscribe(
                                () => {
                                    console.log("Role updated successfully");
                                }
                            );
      
                } else {
                    console.log('Aucun mot-clé trouvé dans l\'image.');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Vérification échouée',
                        text: 'Aucun mot-clé trouvé dans l\'image.'
                    });
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
