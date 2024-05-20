import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) 

    {console.log("tttttt")  }

  logout() {
    this.oauthService.logOut();
  }

}
