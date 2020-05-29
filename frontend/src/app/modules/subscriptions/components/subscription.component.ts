import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubscriptionsService} from "../../../services/subscriptions.service";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {switchMap} from "rxjs/operators";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private userId: number;
  public subUsers: User[] = [];
  private currentUser: User;
  public currentState: boolean = false;

  constructor(private route: ActivatedRoute,
              private subscriptionsService: SubscriptionsService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getRouteParam();
  }

  private getRouteParam(): void {
    this.subscriptions.push(this.route.queryParamMap.pipe(
      switchMap(params =>
        params.getAll('id'))).subscribe( id => {
      this.userId = Number(id);
      this.getSubscriptions();
    }));
  }

  public checkUsers(): boolean {
    return this.userId === this.currentUser.id;
  }

  private getSubscriptions(): void {
    this.subscriptions.push(this.subscriptionsService.getSubscriptions(this.userId)
      .subscribe(users => {
        this.subUsers = users;
        this.getCurrentState();
        console.log(users);
      }))
  }

  public subscribe(): void {
    if(!this.checkUsers()) {
      const user = new User();
      user.id = this.userId;
      this.subscriptions.push(this.subscriptionsService.saveSubscription(this.currentUser.id, user)
        .subscribe(subUser => {
          this.subUsers.push(subUser);
          this.currentState = true;
        }))
    }
  }

  public unsubscribe(): void {
    if(!this.checkUsers()) {
      this.subscriptions.push(this.subscriptionsService
        .deleteSubscription(this.currentUser.id, this.userId)
        .subscribe(() => {
          this.removeFromArray();
          this.currentState = false;
        }))
    }
  }

  private getCurrentState(): void {
    const index = SubscriptionComponent.contains(this.subUsers, this.currentUser);
    if(index > -1) {
      this.currentState = true;
    }
  }

  private removeFromArray(): void {
    const index = SubscriptionComponent.contains(this.subUsers, this.currentUser);
    if(index > -1) {
      this.subUsers.splice(index, 1);
    }
  }

  private static contains(arr: User[], obj: User): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === obj.id) {
        return i;
      }
    }
    return -1;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
