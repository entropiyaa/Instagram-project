import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {StorageService} from "../../../services/storage.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private user: User;
  private subscriptions: Subscription[] = [];

  constructor(private storageService: StorageService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  public getCurrentUserId(): number {
    this.user = this.authService.getCurrentUser();
    return this.user.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
