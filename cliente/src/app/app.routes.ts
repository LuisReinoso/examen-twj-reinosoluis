import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { HomeComponent} from "./home/home.component";
import { BodegaComponent } from './bodega/bodega.component';
import { ItemComponent } from './item/item.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bodega', component: BodegaComponent },
  { path: 'item', component: ItemComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
