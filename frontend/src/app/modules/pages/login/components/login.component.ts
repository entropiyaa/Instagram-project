import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {Login} from "../../../../models/login";
import {StorageService} from "../../../../services/storage.service";
import {LoginService} from "../../../../services/login.service";
import {AuthToken} from "../../../../models/authToken";
import {LoginUser} from "../../../../models/loginUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public login: LoginUser = {};
  user: User;
  public showCheckYourSetDataAlert: boolean = false;
  private subscriptions: Subscription[] = [];

  visibleRegistration: boolean = false;
  newLogin: Login;

  constructor(private storageService: StorageService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
  }

  public onSubmit(): void {
    this.getToken();
  }

  private getToken(): void {
    this.subscriptions.push(this.loginService.generateToken(this.login)
      .subscribe((authToken: AuthToken) => {
        if(authToken) {
          this.storageService.setToken(authToken.token);
          this.getAuthorizedUser();
        }
    }, (error) => {
        if (error.status === 401) {
          this.showCheckYourSetDataAlert = true;
        } else {
          alert(error.message);
        }
      }))
  }

  private getAuthorizedUser(): void {
    this.subscriptions.push(this.loginService.getAuthorizedUser().subscribe((user: User) => {
      console.log(user);
      this.storageService.setCurrentUser(user);
      this.user = user;
    }));
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
    this.storageService.setCurrentUser(null);
    this.user = null;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
