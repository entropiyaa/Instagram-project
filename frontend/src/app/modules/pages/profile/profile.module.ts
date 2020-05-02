import { NgModule } from "@angular/core";
import {ProfileComponent} from "./components/profile.component";
import {CommonModule} from "@angular/common";
import {PostsModule} from "../../posts/posts.module";
import {RouterModule} from "@angular/router";
import {PostModule} from "../../post/post.module";
import {PagingModule} from "../../paging/paging.module";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PostsModule,
    RouterModule,
    PostModule,
    PagingModule
  ],
  providers: [],
  exports: [ProfileComponent]
})
export class ProfileModule {}
