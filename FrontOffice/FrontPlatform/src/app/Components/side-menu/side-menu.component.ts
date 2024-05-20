import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
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
      window.location.reload();
  
  }


 

    confirmLogout() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout'
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform logout action here
                this.logout();
            }
        });
    }










}
