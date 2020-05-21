import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../../../models/comment";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Output() newComment: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public commentForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public addComment(): void {
    if(this.commentForm.valid) {
      this.newComment.emit(this.commentForm);
      this.clear();
    }
  }

  public clear(): void {
    this.commentForm.reset();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
