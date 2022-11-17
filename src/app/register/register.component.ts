import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { UserDto } from '../model/user.model';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private url: ActivatedRoute) { }

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
        this.http.post("https://localhost:44342/api/Auth/register",{
            userName: this.newUser.username,
            email: this.newUser.email,
            password: this.newUser.password
        }).subscribe(x => {})
        
        let returnUrl = '';
        this.url.params.subscribe(x => {
            returnUrl = x["returnUrl"];
        })

        this.router.navigateByUrl(returnUrl);
        console.log(this.newUser);
    }

    ngOnInit(): void {
        
    }
}