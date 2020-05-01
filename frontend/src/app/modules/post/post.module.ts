import { NgModule } from "@angular/core";
import {PostComponent} from "./components/post.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CommentModule} from "../comment/comment.module";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommentModule
  ],
  providers: [],
  exports: [PostComponent]
})
export class PostModule {}
