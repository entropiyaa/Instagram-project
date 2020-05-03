import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public text: string;
  @Output() newComment: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  public addComment(text: string): void {
    this.newComment.emit(text);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
