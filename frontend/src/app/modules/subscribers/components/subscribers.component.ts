import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubscriptionsService} from "../../../services/subscriptions.service";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public subUsers: User[] = [];
  private userId: number;

  constructor(private subscriptionsService: SubscriptionsService,
              private authService: AuthService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRouteParam();
  }

  private getRouteParam(): void {
    this.subscriptions.push(this.route.queryParamMap.pipe(
      switchMap(params =>
        params.getAll('id'))).subscribe( id => {
      this.userId = Number(id);
      this.getSubscribers();
    }));
  }

  private getSubscribers(): void {
    this.subscriptions.push(this.subscriptionsService.getSubscribers(this.userId)
      .subscribe(users => {
        this.subUsers = users;
        console.log(users);
      }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
