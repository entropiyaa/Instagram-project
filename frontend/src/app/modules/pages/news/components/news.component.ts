import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {StorageService} from "../../../../services/storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  public currentUser: User;
  private subscriptions: Subscription[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.subscriptions.push(this.storageService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
