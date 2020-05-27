import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {UserStatus} from "../../../models/enums/user-status";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Output() newComment: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public commentForm: FormGroup;
  private user: User;

  constructor(private _snackBar: MatSnackBar,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.createForm();
  }

  public createForm(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.maxLength(100)])
    });
  }

  public addComment(): void {
    if(this.user.status === UserStatus.ACTIVE) {
      if (this.commentForm.valid) {
        if (this.commentForm.value.comment !== "") {
          this.newComment.emit(this.commentForm);
        } else {
          this._snackBar.open('Empty comment', '', {duration: 3000});
        }
      }
    } else {
      this._snackBar.open('You are blocked', '', {duration: 3000});
    }
    this.clear();
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
