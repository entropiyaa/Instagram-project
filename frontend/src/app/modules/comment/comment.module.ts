import { NgModule } from "@angular/core";
import {CommentComponent} from "./components/comment.component";
import {CommonModule} from "@angular/common";
import {CreateCommentModule} from "../create-comment/create-comment.module";


@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    CreateCommentModule
  ],
  providers: [],
  exports: [CommentComponent]
})
export class CommentModule {}
