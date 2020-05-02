import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public commentId: number;
  @Input() public comment: Comment = new Comment();

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
  }

  public getComment(): void {
    this.subscriptions.push(this.commentService.getComment(this.commentId).subscribe(comment => {
      this.comment = comment;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
