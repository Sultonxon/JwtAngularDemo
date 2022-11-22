import { JwtHelperService } from "@auth0/angular-jwt";
import { roleIndex } from "./admin.guard";

export function isAdmin(jwtHelper: JwtHelperService): boolean {
    let token = localStorage.getItem("jwt");
    if(token && !jwtHelper.isTokenExpired(token)){
        let decodedToken = jwtHelper.decodeToken(token);
        if(decodedToken){
            
            if(decodedToken[roleIndex][0].toLowerCase()==="admin" 
            || decodedToken[roleIndex][1].toLowerCase()==="admin" 
            || decodedToken[roleIndex].toLowerCase() === "admin"){
                return true;
            }
        }
    }
    return false;
}

 