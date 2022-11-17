import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";



@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public router: Router, private jwtHelper: JwtHelperService){ }

    logToken(){
        console.log(this.jwtHelper.decodeToken(localStorage.getItem("jwt")??""));
    }

    ngOnInit(): void {
        
    }

}