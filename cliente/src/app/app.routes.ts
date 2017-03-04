import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { HomeComponent} from "./home/home.component";
import { BodegaComponent } from './bodega/bodega.component';
import { ListarbodegaComponent } from './listarbodega/listarbodega.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'crearBodega', component: BodegaComponent },
  { path: 'listarBodegas', component: ListarbodegaComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
