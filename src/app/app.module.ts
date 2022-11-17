import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './products/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { ProductService } from './services/product.service';
import { ValidationComponent } from './validation/validation.component';

export function tokenGetter(){
  
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, ProductComponent, RegisterComponent, ValidationComponent

  ],
  imports: [
    BrowserModule,
    RouterModule, RouterModule.forRoot(routes),
    HttpClientModule, FormsModule, ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44342"],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
