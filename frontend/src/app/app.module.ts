import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { ProdComponent } from './prod/prod.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AboutComponent } from './about/about.component';

import { routing } from './app.routing';
import { ProductsComponent } from './products/products.component';

import {  MATERIAL_SANITY_CHECKS } from '@angular/material';
import { ContactComponent } from './contact/contact.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { BuyProductsDialogComponent } from './buy-products-dialog/buy-products-dialog.component';
import { SharedInfoComponent } from './shared-info/shared-info.component';


@NgModule({
  entryComponents:[
    BuyProductsDialogComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    ProdComponent,
    UserInfoComponent,
    BuyProductsDialogComponent,
    SharedInfoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
	  routing,
    FormsModule,
    HttpModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatListModule,
    MatSliderModule
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
