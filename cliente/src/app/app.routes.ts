import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { HomeComponent} from "./home/home.component";
import { BodegaComponent } from './bodega/bodega.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'crearBodega', component: BodegaComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
