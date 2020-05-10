import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Input() public post: Post = new Post();
  @Output() public onDelete: EventEmitter<void> = new EventEmitter<void>();
  public postId: number;

  constructor(private postService: PostService, private route: ActivatedRoute) {
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
        params.getAll('id'))).subscribe(data => this.postId = +data ));
  }

  delete() {
    this.onDelete.emit();
  }

  public deletePost(post: Post): void {
    this.subscriptions.push(this.postService.deletePost(post.id).subscribe(() => {
      console.log("delete post!!");
      this.delete();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
