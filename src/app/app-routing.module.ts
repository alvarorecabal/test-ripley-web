import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'producto/:id', component: ProductComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
