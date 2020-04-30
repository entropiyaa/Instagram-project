import { NgModule } from "@angular/core";
import {ProfileComponent} from "./components/profile.component";
import {CommonModule} from "@angular/common";
import {PostsModule} from "../../posts/posts.module";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PostsModule
  ],
  providers: [],
  exports: [ProfileComponent]
})
export class ProfileModule {}
