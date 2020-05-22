import { NgModule } from "@angular/core";
import {CreateCommentComponent} from "./components/create-comment.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    CreateCommentComponent
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
  ],
  providers: [],
  exports: [CreateCommentComponent]
})
export class CreateCommentModule {}
