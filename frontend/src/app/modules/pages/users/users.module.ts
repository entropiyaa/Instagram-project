import { NgModule } from "@angular/core";
import {UsersComponent} from "./component/users.component";
import {CommonModule} from "@angular/common";
import {UserInfoModule} from "../../user-info/user-info.module";
import {MatCardModule} from "@angular/material/card";
import {ViewModule} from "../../view/view.module";


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserInfoModule,
    MatCardModule,
    ViewModule,
  ],
  providers: [],
  exports: [UsersComponent]
})
export class UsersModule {}
