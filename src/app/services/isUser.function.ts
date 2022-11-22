import { JwtHelperService } from "@auth0/angular-jwt";
import { roleIndex } from "./admin.guard";

export function isUser(jwtHelper: JwtHelperService): boolean {
    let token = localStorage.getItem("jwt");
    if(token && !jwtHelper.isTokenExpired(token)){
        let decodedToken = jwtHelper.decodeToken(token);
        if(decodedToken){
            if(decodedToken[roleIndex][0].toLowerCase()==="user" 
            || decodedToken[roleIndex][1].toLowerCase()==="user"
            || decodedToken[roleIndex].toLowerCase() === "user"){
                return true;
            }
        }
    }

    return false;
}