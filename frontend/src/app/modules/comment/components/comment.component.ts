import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment";
import {User} from "../../../models/user";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Role} from "../../../models/enums/role";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public comments: Comment[] = [];
  @Input() private postId: number;
  private user: User;

  constructor(private commentService: CommentService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getCommentsByPostId();
  }

  public getCommentsByPostId(): void {
    this.subscriptions.push(this.commentService.getCommentsByPostId(this.postId).subscribe(comments => {
      this.comments = comments;
    }));
  }

  public checkUser(comment): boolean {
    return this.user.id === comment.user.id || this.user.role === Role.ADMIN;
  }

  public saveComment(formComment: FormGroup): void {
    const comment = new Comment(formComment.value.comment, this.user.id, this.postId);
    this.subscriptions.push(this.commentService.saveComment(comment).subscribe(comment => {
      this.comments.push(comment);
    }))
  }

  public deleteComment(comment: Comment): void {
    if(this.checkUser(comment)) {
      this.subscriptions.push(this.commentService.deleteComment(comment.id).subscribe(() => {
        const index: number = this.comments.indexOf(comment);
        if (index !== -1) {
          this.comments.splice(index, 1);
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
