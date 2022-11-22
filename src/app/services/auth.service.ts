import { HttpClient } from '@angular/common/http';
import { ParseSourceFile } from '@angular/compiler';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponseDto } from '../model/loginResponseDto.model';
import { UserDto } from '../model/user.model';



export class AuthService {
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService){

    }

    login(user: UserDto): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>("https://localhost:44342/api/Auth/login", user);
    }

    logout(){
        localStorage.removeItem("jwt");
        this.http.post(`${environment.apiUrl}api/Auth/logout`,{}).subscribe(x => {});
    }

    signup(user: UserDto):Observable<Object> {
        return this.http.post(`${environment.apiUrl}api/Auth/register`, user);
    }
}