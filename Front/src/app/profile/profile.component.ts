import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
  })

export class ProfileComponent implements OnInit {
  selectedImage: string | ArrayBuffer | null = null;
  token: string ="";
  userId: string="";
  user: any;
  firstName:String='';
  lastName:String='';
  sex:String='';
  email:String='';
  phone!: Number;
  address:String='';


  constructor(private userService: UserService) {}
 
  ngOnInit(): void {
    this.token = localStorage.getItem('token') as string; 
    console.log('Auth Token:', this.token);
    const decodedToken = this.decodeToken(this.token);
    this.userId = decodedToken.sub;
    this.userService.getUserById(this.userId).subscribe((user: any) => {
      this.user = user;
      console.log(user);
      this.firstName=this.user.firstName ;
      this.lastName=this.user.lastName;
      this.email=this.user.email;
      this.address=this.user.attributes.adresse;
      this.sex=this.user.attributes.sex;
      this.phone=this.user.attributes.phone;  
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


