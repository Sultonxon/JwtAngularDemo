import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

export const roleIndex = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private jwtHelper: JwtHelperService){}

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         const token = localStorage.getItem("jwt");

         if(token && !this.jwtHelper.isTokenExpired(token)){
            let decodedToken = this.jwtHelper.decodeToken(token);

            if(decodedToken[roleIndex][0].toLowerCase()==="admin" 
                || decodedToken[roleIndex][1].toLowerCase()==="admin" 
                || decodedToken[roleIndex].toLowerCase() === "admin")
                    return true;
         }

         this.router.navigate(["login", this.router.url]);
         return false;
     }
}

