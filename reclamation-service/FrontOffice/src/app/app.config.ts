import { provideRouter } from '@angular/router';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ReclamationService } from './reclamation.service';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { TypeRecService } from './type-rec.service';



export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes),
              ReclamationService, 
              provideHttpClient(),
              NgToastService,
              TypeRecService,

              provideClientHydration()]
};
