import { inject } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { roleIndex } from "./admin.guard";


export function isInRole(role: string){
    let jwtHelper = inject(JwtHelperService);
    let token = localStorage.getItem('jwt');
    if(token && !jwtHelper.isTokenExpired(token)){
        let decodedToken = jwtHelper.decodeToken(token);
        if(decodedToken){
            role = role.toLowerCase();
            if(typeof decodedToken[roleIndex] === 'string'){
                return decodedToken[roleIndex].toLowerCase() === role;
            }
            else{
                for (const key in decodedToken[roleIndex]) {
                    if(decodedToken[roleIndex][key] === role) return true;
                }
                return false;
            }
        }
    }
}

