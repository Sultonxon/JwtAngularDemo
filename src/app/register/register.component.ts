import { HttpClient, HttpResponse } from '@angular/common/http';
import { R3SelectorScopeMode } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router, private url: ActivatedRoute) { }

    newUser: UserDto = new UserDto();

    email: FormControl = new FormControl('');

    userName: FormControl = new FormControl('');

    password: FormControl = new FormControl('');

    log(o: any){
        console.log(o);
    }

    get isValid() {
        return this.email.valid && this.userName.valid && this.password;
    }

    submitForm = ()=>{
        console.log("Submition");
        this.auth.signup(this.newUser).subscribe(x => {
             var res = <HttpResponse<Object>>x;

             if(res.status === 200 || res.status === 201){
                let returnUrl = '';
                this.url.params.subscribe(x => {
                    returnUrl = x["returnUrl"];
                })
        
                this.router.navigateByUrl(returnUrl);
                console.log(this.newUser);
             }             
        })
        
        
    }

    ngOnInit(): void {
        
    }
}