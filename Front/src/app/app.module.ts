import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleModule,RecurrenceEditorModule ,DayService,WeekService,WorkWeekService,MonthAgendaService,MonthService} from '@syncfusion/ej2-angular-schedule';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ClassesComponent } from './classes/classes.component';
import { ContactComponent } from './contact/contact.component';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RdvComponent } from './rdv/rdv.component';
import { ServiceComponent } from './service/service.component';
import {ShopComponent } from './shop/shop.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddRdvComponent } from './add-rdv/add-rdv.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { DetailShopComponent } from './detail-shop/detail-shop.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { CartComponent } from './cart/cart.component';
import { NgxCurrencyDirective } from "ngx-currency";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CheckoutComponent } from './checkout/checkout.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifComponent } from './verif/verif.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { RdvdetailComponent } from './rdvdetail/rdvdetail.component';
import { RdvhoraireComponent } from './rdvhoraire/rdvhoraire.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importez le module FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VerifAssociationComponent } from './verif-association/verif-association.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BlogComponent,
    ClassesComponent,
    ContactComponent,
    EventComponent,
    HomeComponent,
    NavbarComponent,
    RdvComponent,
    ServiceComponent,
    ShopComponent,
    CalendarComponent,
    AddPatientComponent,
    AddRdvComponent,
    BlogDetailsComponent,
    DetailShopComponent,
    AddCartComponent,
    CartComponent,
    FooterComponent,
    LocationDialogComponent,
    CheckoutComponent,
    QuestionnaireComponent,
    VerifComponent,
    CommentaireComponent,
    RdvdetailComponent,
    RdvhoraireComponent,
    VerifAssociationComponent,
 
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScheduleModule,
    FullCalendarModule,

    RecurrenceEditorModule,
    NgxCurrencyDirective,
    MatDialogModule,
    GoogleMapsModule,
    MatDialogModule ,
    MatSidenavModule,
    FormsModule,
    WelcomeComponent,
    ProfileComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [DayService,WeekService,WorkWeekService,MonthAgendaService,MonthService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {

}
