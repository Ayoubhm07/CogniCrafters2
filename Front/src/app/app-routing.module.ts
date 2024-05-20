import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  importProvidersFrom } from '@angular/core';
import { DetailShopComponent } from './detail-shop/detail-shop.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ClassesComponent } from './classes/classes.component';
import { ContactComponent } from './contact/contact.component';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RdvComponent } from './rdv/rdv.component';
import { ServiceComponent } from './service/service.component';
import { ShopComponent } from './shop/shop.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { VerifComponent } from './verif/verif.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { RdvdetailComponent } from './rdvdetail/rdvdetail.component';
import { RdvhoraireComponent } from './rdvhoraire/rdvhoraire.component';
import { VerifAssociationComponent } from './verif-association/verif-association.component';

const routes: Routes = [

  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Redirection par défaut vers Home

  {path:'verif-association', component:VerifAssociationComponent},
  {path:'verif', component:VerifComponent},
  {path:'home', component:HomeComponent},
  {path:'welcome', component:WelcomeComponent},
  {path:'profile', component:ProfileComponent},
  {path:'about', component:AboutComponent},
  {path:'rdv', component:RdvComponent},
  {path:'calendar', component:CalendarComponent},
  {path:'rdv', component:RdvComponent},
  {path:'addPatient/:psyId/:horaireId/:date', component:AddPatientComponent},
  {path:'blog/:id', component:BlogDetailsComponent},
  {path:'cal/:id', component:RdvdetailComponent},
  {path:'hpsy/:id', component:RdvhoraireComponent},

  {path:'cmtr', component:CommentaireComponent},
  {path:'product-details/:id', component:DetailShopComponent},

  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutComponent},

  {path:'service', component:ServiceComponent},
  {path:'shop', component:ShopComponent},
  {path:'event', component:EventComponent},
  {path:'blog', component:BlogComponent},
  {path:'contact', component:ContactComponent},
  {path:'diagnostic', component:QuestionnaireComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
