import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { MessagesComponent } from './messages/messages.component';
import { StatComponent } from './stat/stat.component';
import { MapComponent } from './map/map.component';
import { NewProductComponent } from './new-product/new-product.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListeProductComponent } from './liste-product/liste-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { ReclamationComponent } from './reclamation/reclamation.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReclamationComponent,CommonModule,SideMenuComponent,NavBarComponent,FooterComponent,DashboardComponent,ProfileComponent,SecurityComponent,SettingsComponent,NotificationComponent,MessagesComponent,StatComponent,MapComponent,NewProductComponent,
    PaginationComponent,EditProductComponent,DetailProductComponent,ListeProductComponent,OrderListComponent,OrderDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TemplateAssociation';

}
