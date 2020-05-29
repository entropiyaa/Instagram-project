import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {SubscriptionsService} from "../../../../services/subscriptions.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public users: User[] = [];

  constructor(private userService: UserService,
              private subsService: SubscriptionsService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getSubscriptions(): void {
    this.users.forEach(user => {
      this.subscriptions.push(this.subsService.getSubscribers(user.id).subscribe(subUsers => {
        console.log(user);
        console.log(subUsers.length);
      }))
    })
  }

  private getUsers(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.getSubscriptions();
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
