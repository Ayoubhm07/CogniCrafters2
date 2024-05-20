import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken} from 'firebase/messaging';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  userid: string ="";
token : string ="";
  constructor(private keycloakService: KeycloakService, private router: Router,private userservice : UserService) { }
  

  ngOnInit(): void {
    this.handleNavigation();
  }
  public async handleNavigation() {
    try {
      this.token = await this.keycloakService.getToken();
      localStorage.setItem('token', this.token);  
          const decodedToken = this.decodeToken(this.token);
      console.log(decodedToken);
      const roles = decodedToken.resource_access?.CogniCrafters?.roles;
      if (roles?.includes('admin')) {
        this.router.navigate(['/settings']);
      } else {
        this.userid=decodedToken.sub;
        this.userservice.getUserById(this.userid).subscribe(
          (userData) => {
            if (userData.attributes && userData.attributes.role && userData.attributes.role.includes('psychiatre')) {
              const url = new URL('http://localhost:4204');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
            }
            if (userData.attributes && userData.attributes.role && userData.attributes.role.includes('association')) {
              const url = new URL('http://localhost:4203');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
            }
            if (userData.attributes && userData.attributes.role && userData.attributes.role.includes('client')) {
              const url = new URL('http://localhost:4202');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
            }
            else{
              const url = new URL('http://localhost:4201/welcome');
              url.searchParams.append('token', this.token);
              window.location.href = url.toString();
            }

        }
    );
  } 
  }catch (error) {
      console.error('Error during navigation:', error);
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
