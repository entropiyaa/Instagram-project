import { NgModule } from "@angular/core";
import {CommentComponent} from "./components/comment.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule

  ],
  providers: [],
  exports: [CommentComponent]
})
export class CommentModule {}
