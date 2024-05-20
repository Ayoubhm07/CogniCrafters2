import { NewProductComponent } from './Components/new-product/new-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './/Components/dashboard/dashboard.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SecurityComponent } from './Components/security/security.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { MapComponent } from './Components/map/map.component';
import { StatComponent } from './Components/stat/stat.component';
import { ListeProductComponent } from './Components/liste-product/liste-product.component';
import { DetailProductComponent } from './Components/detail-product/detail-product.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { PsychiatreComponent } from './Components/psychiatre/psychiatre.component';
import { AssociationComponent } from './Components/association/association.component';
import { ClientComponent } from './Components/client/client.component';
import { Dashboard2Component } from './Components/dashboard2/dashboard2.component';
const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Redirection vers Dashboard par défaut
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
  { path: 'listeProduct', component: ListeProductComponent },
  { path: 'detail-produit/:id', component: DetailProductComponent },
  { path: 'listeOrders', component: OrderListComponent },
  { path: 'detailOrder', component: OrderDetailComponent },
  { path: 'add', component: NewProductComponent },
  { path: 'psychiatre', component: PsychiatreComponent },
  { path: 'association', component: AssociationComponent },
  { path: 'client', component: ClientComponent },


  { path: 'messages', component: MessagesComponent },
   { path: 'settings', component: SettingsComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'security', component: SecurityComponent },
   { path: 'notifications', component: NotificationComponent },
   { path: 'calendar', component: CalendarComponent },
   { path: 'map', component: MapComponent },
   { path: 'stat', component: StatComponent },
   { path: 'dashboard2', component: Dashboard2Component },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
