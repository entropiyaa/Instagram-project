import { NgModule } from "@angular/core";
import {PostComponent} from "./components/post.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CommentModule} from "../comment/comment.module";
import {ReactionModule} from "../reaction/reaction.module";
import {ComplaintsModule} from "../complaints/complaints.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {AppRoutingModule} from "../../app-routing.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserModule} from "@angular/platform-browser";
import {CreateCommentModule} from "../create-comment/create-comment.module";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {ReactionViewModule} from "../reaction-view/reaction-view.module";


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommentModule,
    ReactionModule,
    ComplaintsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    CreateCommentModule,
    MatCardModule,
    MatDividerModule,
    ReactionViewModule
  ],
  providers: [],
  exports: [PostComponent]
})
export class PostModule {}
