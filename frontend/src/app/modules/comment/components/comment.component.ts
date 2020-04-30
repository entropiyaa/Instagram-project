import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  public comments: Comment[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getCommentsByPostId(25);
  }

  public getCommentsByPostId(postId: number): void {
    this.subscriptions.push(this.commentService.getCommentsByPostId(postId).subscribe(comments => {
      this.comments = comments;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
