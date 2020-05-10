import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment";
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public comments: Comment[] = [];
  @Input() private postId: number;

  constructor(private commentService: CommentService,
              private storageService: StorageService) {}

  ngOnInit(): void {
    this.getCommentsByPostId();
  }

  public getCommentsByPostId(): void {
    this.subscriptions.push(this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.comments = comments;
    }));
  }

  public saveComment(text: string): void {
    const comment = new Comment();
    comment.user.id = this.storageService.getCurrentUser().id;
    comment.post.id = this.postId;
    comment.text = text;
    this.subscriptions.push(this.commentService.saveComment(comment).subscribe(comment => {
      console.log(comment);
      this.comments.push(comment);
    }))
  }

  public deleteComment(comment: Comment): void {
    this.subscriptions.push(this.commentService.deleteComment(comment.id).subscribe(() => {
      console.log("delete success");
      const index: number = this.comments.indexOf(comment);
      if(index !== -1) {
        this.comments.splice(index, 1);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
