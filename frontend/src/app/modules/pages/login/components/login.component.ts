import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {AuthToken, UserService} from "../../../../services/user.service";
import {Subscription} from "rxjs";
import {Login} from "../../../../models/login";
import {StorageService} from "../../../../services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // public users: User[] = [];
  // public userId: number;
  public user: User = new User();
  //
  public getUser(userId: number): void {
    this.subscriptions.push(this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      console.log(user);
    }));
  }
  //
  // public getUsers(): void {
  //   this.subscriptions.push(this.userService.getUsers().subscribe(users => {
  //     this.users = users;
  //   }));
  // }
  //
  // public onClick(userId: number): void {
  //   this.userId = userId;
  //   this.getUser(userId);
  // }

  public login: Login = {};
  public showCheckYourSetDataAlert: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(public storageService: StorageService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.userService.generateToken(this.login)
      .subscribe((authToken: AuthToken) => {
        if (authToken.token) {
          this.storageService.setToken(authToken.token);
          this.userService.getAuthorizedUser()
            .subscribe((user: User) => {
              console.log(user);
              this.storageService.setCurrentUser(user);
            });
        }
      }, (error) => {
        if (error.status === 401) {
          this.showCheckYourSetDataAlert = true;
        } else {
          alert(error.message);
        }
      });

  }

  public logout(): void {
    this.storageService.clearToken();
    this.storageService.setCurrentUser(null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
