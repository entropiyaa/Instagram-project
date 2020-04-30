import { NgModule } from "@angular/core";
import {PostsComponent} from "./components/posts.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PostService} from "../../services/post.service";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommentModule} from "../comment/comment.module";
import {PostModule} from "../post/post.module";

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommentModule,
    PostModule,
  ],
  providers: [PostService],
  exports: [PostsComponent]
})
export class PostsModule {}
