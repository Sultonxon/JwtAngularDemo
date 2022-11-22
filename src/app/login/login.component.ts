import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginResponseDto } from "../model/loginResponseDto.model";
import { UserDto } from "../model/user.model";
import { AuthService } from "../services/auth.service";


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{

    constructor(private auth: AuthService , private router: Router, private url: ActivatedRoute) { }

    public username:string = "";
    public password: string= "";
    public hasError: boolean = false;
    public errors: string[]=[];
    public logged: boolean = false;

    public userName: FormControl = new FormControl();
    public pass: FormControl = new FormControl();


    Login = ()=>{
        if(!window.confirm("Would you like to log in")){
            return;
        }

       this.auth.login(new UserDto(this.username, undefined, this.password)).subscribe(r=>{
                        this.logged = r.isAuthSuccessful ? true: false;
                        if(r.isAuthSuccessful){
                            localStorage.setItem("jwt",r.token ? r.token : "");
                            window.alert("You have signed in successfully!");
                            let returnUrl = "";
                            this.username = '';
                            this.password = '';
                            
                            this.url.params.subscribe(x => returnUrl = x["returnUrl"]);
                            this.router.navigateByUrl(returnUrl);
                        }
                        else{
                            r.errorMessage?.forEach(x => this.errors.push(x));
                        }
                    });
        
        
    }

    ngOnInit(): void {
        
    }
}

