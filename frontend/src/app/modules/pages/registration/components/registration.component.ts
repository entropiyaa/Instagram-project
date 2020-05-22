import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Login} from "../../../../models/login";
import {User} from "../../../../models/user";
import {LoginService} from "../../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createHasError, HasErrorFunction} from "../../../../util/has-error";
import {validation} from "../../../../util/validation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public registrationForm: FormGroup;
  public hasError: HasErrorFunction;
  public validation = validation;

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.registrationForm = this.fb.group({
      email: ['',  [Validators.required,
        Validators.maxLength(validation.email.maxlength),
        Validators.minLength(validation.email.minlength),
        Validators.pattern(validation.email.pattern)]],
      password: ['', [Validators.required,
        Validators.maxLength(validation.password.maxlength),
        Validators.minLength(validation.password.minlength),
        Validators.pattern(validation.password.pattern)]],
      username: ['', this.validationArr],
      firstName: ['', this.validationArr],
      lastName: ['', this.validationArr],
      bio: ['', [Validators.maxLength(validation.text.maxlength)]]
    });
    this.hasError = createHasError(this.registrationForm);
  }

  private validationArr: any[] = [
    Validators.required,
    Validators.maxLength(validation.name.maxlength),
    Validators.minLength(validation.name.minlength),
    Validators.pattern(validation.name.pattern)];

  public onSubmit(): void {
    console.log("onSubmit");
    if(this.registrationForm.valid) {
      const login: Login = new Login();
      login.user = new User();
      login.email = this.registrationForm.value.email;
      login.password = this.registrationForm.value.password;
      login.user.username = this.registrationForm.value.username;
      login.user.firstName = this.registrationForm.value.firstName;
      login.user.lastName = this.registrationForm.value.lastName;
      login.user.bio = this.registrationForm.value.bio;
      this.registration(login);
    }
  }

  private registration(login: Login): void {
    console.log(login);
    this.subscriptions.push(this.loginService.register(login).subscribe(login => {
      console.log(login);
      this.clear();
      this.router.navigate(['login']);
    }))
  }

  private clear(): void {
    this.registrationForm.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
