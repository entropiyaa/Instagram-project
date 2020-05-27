import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {User} from "../../../models/user";
import {Role} from "../../../models/enums/role";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Input() public post: Post;
  @Input() public currentUser: User;
  @Output() public onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  public checkUser(): boolean {
    return this.currentUser.id === this.post.user.id || this.currentUser.role === Role.ADMIN;
  }

  delete() {
    this.onDelete.emit();
  }

  public deletePost(post: Post): void {
    if(this.checkUser()) {
      this.subscriptions.push(this.postService.deletePost(post.id).subscribe(() => {
        this.delete();
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
