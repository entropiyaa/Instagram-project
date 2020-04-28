import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  private subscriptions: Subscription[] = [];
  public userId: number;
  public user: User = new User();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  public getUser(userId: number): void {
    this.subscriptions.push(this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      console.log(user);
    }));
  }

  public getUsers(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe(users => {
      this.users = users;
    }));
  }

  public onClick(userId: number): void {
    this.userId = userId;
    this.getUser(userId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
