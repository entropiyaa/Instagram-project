import { NgModule } from "@angular/core";
import {UsersComponent} from "./component/users.component";
import {CommonModule} from "@angular/common";
import {UserInfoModule} from "../../user-info/user-info.module";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserInfoModule,
    MatCardModule,
  ],
  providers: [],
  exports: [UsersComponent]
})
export class UsersModule {}
