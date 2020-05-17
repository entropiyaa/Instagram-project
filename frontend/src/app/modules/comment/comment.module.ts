import { NgModule } from "@angular/core";
import {CommentComponent} from "./components/comment.component";
import {CommonModule} from "@angular/common";
import {CreateCommentModule} from "../create-comment/create-comment.module";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    CreateCommentModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  exports: [CommentComponent]
})
export class CommentModule {}
