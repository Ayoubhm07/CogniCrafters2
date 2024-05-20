import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { MessagesComponent } from './messages/messages.component';
import { StatComponent } from './stat/stat.component';
import { MapComponent } from './map/map.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListeProductComponent } from './liste-product/liste-product.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NgModule } from '@angular/core';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { TypeRecComponent } from './type-rec/type-rec.component';
export const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // Redirection vers Dashboard par défaut
{ path: 'Dashboard', component: DashboardComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'security', component: SecurityComponent },
{ path: 'settings', component: SettingsComponent },
{ path: 'notifications', component: NotificationComponent },
{ path: 'messages', component: MessagesComponent },
{ path: 'stat', component: StatComponent },
{ path: 'map', component: MapComponent },
{ path: 'newProduct', component: NewProductComponent },
{ path: 'editProduct', component: EditProductComponent },
{ path: 'detailProduct', component: DetailProductComponent },
{ path: 'listeProduct', component: ListeProductComponent },
{ path: 'listeOrders', component: OrderListComponent },
{ path: 'detailOrder', component: OrderDetailComponent },
{ path: 'reclamation', component: ReclamationComponent },
{ path: 'Typerec', component: TypeRecComponent },



];

