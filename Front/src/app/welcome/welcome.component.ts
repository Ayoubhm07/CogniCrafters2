import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  token: string ="";
  userid: string ="";
  constructor(private route: ActivatedRoute, private userservice: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      localStorage.setItem('token', this.token);
      console.log('Token:', this.token);
      this.showSuccessNotification();
    });
  }
  psyNotification(): void {
    const url = window.location.href;
    const tokenPresent = url.includes('token=');
      if (tokenPresent) {
        this.token = localStorage.getItem('token') as string; 
        const decodedToken = this.decodeToken(this.token);
        this.userid=decodedToken.sub;
        this.userservice.getUserById(this.userid).subscribe(
          (userData) => {
            if (userData.attributes && userData.attributes.role && userData.attributes.role.includes('psychiatre')) {
              const url = new URL('http://localhost:4204');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
            } else {
              window.location.href = 'http://localhost:4201/verif';
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );

    } else {
    Swal.fire({
      title: 'Accès restreint',
      text: 'Pour accéder à l\'espace psychiatre, vous devez vous connecter en tant que psychiatre.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'http://localhost:4200/';
      }
    });
  }
  }
  

  associationNotification(): void {
    const url = window.location.href;
    const tokenPresent = url.includes('token=');
      if (tokenPresent) {
        this.token = localStorage.getItem('token') as string; 
        const decodedToken = this.decodeToken(this.token);
        this.userid=decodedToken.sub;
        this.userservice.getUserById(this.userid).subscribe(
          (userData) => {
            if (userData.attributes && userData.attributes.role && userData.attributes.role.includes('association')) {
              const url = new URL('http://localhost:4203');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
            } else {
              window.location.href = 'http://localhost:4201/verif-association';
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );

    } else {
    Swal.fire({
      title: 'Accès restreint',
      text: 'Pour accéder à l\'espace association, vous devez vous connecter en tant que association.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'http://localhost:4200/';
      }
    });
  }
  }

  patientNotification(): void {
    const url = window.location.href;
    const tokenPresent = url.includes('token=');
      if (tokenPresent) {
        this.token = localStorage.getItem('token') as string; 
        const decodedToken = this.decodeToken(this.token);
        this.userid=decodedToken.sub;
        this.userservice.getUserById(this.userid).subscribe(
          (userData) => {
            if (userData.attributes && userData.attributes.role && userData.attributes.role.includes('client')) {
              const url = new URL('http://localhost:4202');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
              
            } else {
              
              window.location.href = 'http://localhost:4202';
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );

    }else {
    Swal.fire({
      title: 'Accès restreint',
      text: 'Pour accéder à l\'espace patient, vous devez vous connecter en tant que patient.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'http://localhost:4200/';
      }
    });
    }
  }
  showSuccessNotification(): void {
    Swal.fire({
      icon: 'success',
      title: 'You are Welcome!',
      showConfirmButton: false,
      timer: 2500 
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
}
