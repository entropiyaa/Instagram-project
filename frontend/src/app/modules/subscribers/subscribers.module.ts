import { NgModule } from "@angular/core";
import {UserInfoModule} from "../user-info/user-info.module";
import {ViewModule} from "../view/view.module";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {SubscribersComponent} from "./components/subscribers.component";


@NgModule({
  declarations: [
    SubscribersComponent
  ],
  imports: [
    UserInfoModule,
    ViewModule,
    CommonModule,
    BrowserModule,
  ],
  providers: [],
  exports: [SubscribersComponent]
})
export class SubscribersModule {}
