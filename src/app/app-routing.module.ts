import { Component, Directive, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './products/product.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ValidationComponent } from './validation/validation.component';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'products', component: ProductComponent, canActivate: [AuthGuard]},
  {path:'login/:returnUrl', component: LoginComponent},
  {path:'register/: returnUrl', component: RegisterComponent},
  {path: "validate", component: ValidationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

