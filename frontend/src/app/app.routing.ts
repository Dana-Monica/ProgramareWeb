import {Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {ContactComponent } from './contact/contact.component';
import { AuthGuard } from './services/guards/auth.guard';

const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent }, //AuthGuard-ca sa vezi daca esti loghinat sau nu
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);