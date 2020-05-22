import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {Login} from "../../../../models/login";
import {StorageService} from "../../../../services/storage.service";
import {LoginService} from "../../../../services/login.service";
import {AuthToken} from "../../../../models/authToken";
import {LoginUser} from "../../../../models/loginUser";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public login: LoginUser = {};
  public user: User;
  public showCheckYourSetDataAlert: boolean = false;
  private subscriptions: Subscription[] = [];

  public visibleRegistration: boolean = false;
  public newLogin: Login;

  constructor(public storageService: StorageService,
              private loginService: LoginService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  public onSubmit(): void {
    this.getToken();
  }

  private getToken(): void {
    this.subscriptions.push(this.loginService.generateToken(this.login)
      .subscribe((authToken: AuthToken) => {
        if(authToken) {
          this.storageService.setToken(authToken);
          this.authService.getCurrentUserFromServer().then(data => this.getCurrentUser());
        }
    }, (error) => {
        if (error.status === 401) {
          this.showCheckYourSetDataAlert = true;
        } else {
          alert(error.message);
        }
      }))
  }

  private getCurrentUser(): void {
    this.user = this.authService.getCurrentUser();
  }

  public onRegistration(): void {
    this.visibleRegistration = true;
    this.newLogin = new Login();
    this.newLogin.user = new User();
  }

  public registration(): void {
    this.subscriptions.push(this.loginService.register(this.newLogin).subscribe(login => {
      console.log(login);
    }))
  }

  public logout(): void {
    this.storageService.clearToken();
    this.user = null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
