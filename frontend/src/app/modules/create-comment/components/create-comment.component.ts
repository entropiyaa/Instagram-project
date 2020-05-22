import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Output() newComment: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public commentForm: FormGroup;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.maxLength(100)])
    });
  }

  public addComment(): void {
    if(this.commentForm.valid) {
      if(this.commentForm.value.comment !== "") {
        this.newComment.emit(this.commentForm);
        this.clear();
      } else {
        this._snackBar.open('Empty comment', '', {duration: 3000});
      }
    }
  }

  public clear(): void {
    this.commentForm.reset();
    this.commentForm.value.comment = "";
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
