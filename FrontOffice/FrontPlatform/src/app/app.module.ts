import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SecurityComponent } from './Components/security/security.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { StatComponent } from './Components/stat/stat.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { DetailProductComponent } from './Components/detail-product/detail-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { ListeProductComponent } from './Components/liste-product/liste-product.component';
import { MapComponent } from './Components/map/map.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { SigninComponent } from './Components/signin/signin.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatPaginatorModule} from '@angular/material/paginator';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CameraDialogComponent } from './Components/camera-dialog/camera-dialog.component';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { PsychiatreComponent } from './Components/psychiatre/psychiatre.component';
import { AssociationComponent } from './Components/association/association.component';
import { ClientComponent } from './Components/client/client.component';
import { PsychiatristDetailsComponent } from './Components/psychiatrist-details/psychiatrist-details.component';
import { Dashboard2Component } from './Components/dashboard2/dashboard2.component';


initializeApp(environment.firebase);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
  keycloak.init({
    config: {
      url: 'http://localhost:8080', // URL de base du serveur Keycloak
      realm: 'CogniCrafters', // Nom du realm
      clientId: 'Angular', // ID du client (aussi appelé "clientId" dans Keycloak)
    },
    initOptions: {
      onLoad: 'login-required', // ou 'check-sso'
      scope: 'openid profile', // Scope demandé // Méthode PKCE pour renforcer la sécurité de l'échange de code d'autorisation
    },
    bearerExcludedUrls: [], // URLs pour lesquelles les requêtes ne doivent pas inclure le token d'autorisation
    enableBearerInterceptor: true, // Active l'intercepteur pour ajouter automatiquement le token d'autorisation
  });
}



@NgModule({
  declarations: [
  
    SettingsComponent,
    AppComponent,
    SideMenuComponent,
    FooterComponent,
    NavBarComponent,
    DashboardComponent,
    NewProductComponent,
    MessagesComponent,
    NotificationComponent,
    SettingsComponent,
    ProfileComponent,
    SecurityComponent,
    SignUpComponent,
    StatComponent,
    CalendarComponent,
    DetailProductComponent,
    EditProductComponent,
    ListeProductComponent,
    MapComponent,
    OrderListComponent,
    OrderDetailComponent,
    SigninComponent,
    CameraDialogComponent,
    PsychiatreComponent,
    AssociationComponent,
    ClientComponent,
    PsychiatristDetailsComponent,
    Dashboard2Component
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    provideHttpClient(
      withInterceptorsFromDi() // tell httpClient to use interceptors from DI
    ),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
