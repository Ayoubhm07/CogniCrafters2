import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  token : string ="";
  id: any;
  
    constructor(private userService:UserService, private router:Router) { }
  
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
  
    logout(): void {
      this.token = localStorage.getItem('token') as string;
        if (!this.token) {
          console.error('No token found in localStorage.');
          return;
        }
      const decodedToken = this.decodeToken(this.token);
      this.userService.logout(decodedToken.sub) 
        .subscribe({
          next: (response) => {
            console.log('Logged out successfully');
          },
          error: (error) => {
            console.error('Logout failed', error);
          }
        });
        window.location.href = 'http://localhost:4200';






    
    }
  
  
}
