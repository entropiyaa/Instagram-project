import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private user: User = new User();
  private subscriptions: Subscription[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.subscriptions.push(this.storageService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
    }));
  }

  public getCurrentUserId(): number {
    return this.user.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
