import { NgModule } from "@angular/core";
import {PostComponent} from "./components/post.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CommentModule} from "../comment/comment.module";
import {ReactionModule} from "../reaction/reaction.module";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommentModule,
    ReactionModule
  ],
  providers: [],
  exports: [PostComponent]
})
export class PostModule {}
