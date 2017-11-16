import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { ProdComponent } from './prod/prod.component';
import { AuthGuard } from './services/guards/auth.guard';

import { routing } from './app.routing';
import { ProductsComponent } from './products/products.component';

import {  MATERIAL_SANITY_CHECKS } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryComponent,
    ProductsComponent,
    ProdComponent
  ],
  imports: [
    BrowserModule,
	routing,
  FormsModule,
  HttpModule,
  MatCardModule,
  MatButtonModule
  ],
  providers: 
    [AuthGuard,
      {
    provide: MATERIAL_SANITY_CHECKS,
    useValue: false
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
