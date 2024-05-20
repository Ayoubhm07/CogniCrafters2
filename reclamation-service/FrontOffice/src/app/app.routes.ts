import { RouterModule, Routes } from '@angular/router';
import { AjouterRecComponent } from './ajouter-rec/ajouter-rec.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [

    { path: 'Dashboard', component: DashboardComponent },

    { path: 'ajouter', component: AjouterRecComponent },
    { path: 'Reclamations', component: ReclamationsComponent },
];
