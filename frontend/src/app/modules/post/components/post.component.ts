import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
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
  public postId: number;

  constructor(private postService: PostService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  public getPost(): void {
    this.subscriptions.push(this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    }));
  }

  public getRouteParam(): void {
    this.subscriptions.push(this.route.paramMap.pipe(
      switchMap(params =>
        params.getAll('id'))).subscribe(data => {
          this.postId = +data;
          this.getPost()
        }));
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
