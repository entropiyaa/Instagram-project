import { NgModule } from "@angular/core";
import {CreateCommentComponent} from "./components/create-comment.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateCommentComponent
  ],
  imports: [
    FormsModule
  ],
  providers: [],
  exports: [CreateCommentComponent]
})
export class CreateCommentModule {}
