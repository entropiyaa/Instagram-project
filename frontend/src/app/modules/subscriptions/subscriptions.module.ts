import { NgModule } from "@angular/core";
import {SubscriptionComponent} from "./components/subscription.component";
import {UserInfoModule} from "../user-info/user-info.module";
import {ViewModule} from "../view/view.module";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    SubscriptionComponent
  ],
  imports: [
    UserInfoModule,
    ViewModule,
    CommonModule,
    BrowserModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [SubscriptionComponent]
})
export class SubscriptionsModule {}
