import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];
