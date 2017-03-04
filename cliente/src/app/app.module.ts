import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BodegaComponent } from './bodega/bodega.component';

import { MasterUrlService } from "./master-url.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BodegaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [MasterUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
