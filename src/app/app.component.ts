import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { isAdmin } from './services/isAdmin.function';
import { isUser } from './services/isUser.function';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnChanges, AfterContentChecked {
  title = 'angularIO';

  constructor(private auth: AuthService, private jwtHelper: JwtHelperService, public router: Router, private url: ActivatedRoute) { 
    this.isAdmin = isAdmin(jwtHelper);
    this.isUser = isUser(jwtHelper);
  }

  public getCurrentUrl = () => {
      return this.router.url;
  }

  ngAfterContentChecked(): void {
    this.isAdmin = isAdmin(this.jwtHelper);
    this.isUser = isUser(this.jwtHelper);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isAdmin = isAdmin(this.jwtHelper);
    this.isUser = isUser(this.jwtHelper);
  }

  public isAdmin: boolean;
  public isUser: boolean;

  ngDoCheck() {
    this.isAdmin = isAdmin(this.jwtHelper);
    this.isUser = isUser(this.jwtHelper);
  }

  public signOut(): void{
    this.auth.logout();
  }

}
