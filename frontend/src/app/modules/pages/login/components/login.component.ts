import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {Login} from "../../../../models/login";
import {StorageService} from "../../../../services/storage.service";
import {LoginService} from "../../../../services/login.service";
import {AuthToken} from "../../../../models/authToken";
import {LoginUser} from "../../../../models/loginUser";
import {AuthService} from "../../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createHasError, HasErrorFunction} from "../../../../util/has-error";
import {validation} from "../../../../util/validation";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  public loginForm: FormGroup;
  public hasError: HasErrorFunction;
  public validation = validation;

  constructor(public storageService: StorageService,
              private loginService: LoginService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.createForm();
    this.getCurrentUser();
  }

  public onSubmit(): void {
    if(this.loginForm.valid) {
      this.login.username = this.loginForm.value.email;
      this.login.password = this.loginForm.value.password;
      this.getToken();
    }
  }

  private getToken(): void {
    this.subscriptions.push(this.loginService.generateToken(this.login)
      .subscribe((authToken: AuthToken) => {
        if(authToken) {
          this.storageService.setToken(authToken);
          this.authService.getCurrentUserFromServer().then(data => {
            this.getCurrentUser();
            this.router.navigate(['/news']);});
        }
    }, (error) => {
        if (error.status === 401) {
          this.showCheckYourSetDataAlert = true;
          this._snackBar.open('Incorrect data', '', {duration: 3000});
        } else {
          alert(error.message);
        }
        this.clear();
      }))
  }

  private clear(): void {
    this.loginForm.reset();
    this.login = null;
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

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['',  [Validators.required,
                    Validators.maxLength(validation.email.maxlength),
                    Validators.minLength(validation.email.minlength),
                    Validators.pattern(validation.email.pattern)]],
      password: ['', Validators.required],
    });
    this.hasError = createHasError(this.loginForm);
  }

}
