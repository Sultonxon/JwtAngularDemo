import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private jwtHelper: JwtHelperService, private url: ActivatedRoute){}

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         const token = localStorage.getItem("jwt");
        console.log(token);
         if(token && !this.jwtHelper.isTokenExpired(token)){
            return true;
         }

         this.router.navigate(["login", this.router.url]);
         return false;
     }
}