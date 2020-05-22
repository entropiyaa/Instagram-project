import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {StorageService} from "../../../services/storage.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private user: User;
  private subscriptions: Subscription[] = [];

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  public getCurrentUserId(): string {
    this.user = this.authService.getCurrentUser();
    if(this.user) {
      return this.user.id.toString();
    }
  }

  public logout(): void {
    this.storageService.clearToken();
    this.user = null;
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
