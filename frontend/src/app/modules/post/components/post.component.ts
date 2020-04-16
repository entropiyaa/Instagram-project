import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {

  public posts: Post[] = [];
  public subscriptions: Subscription[] = [];
  @Input() selectedItem: string;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeByItem();
  }

  changeByItem(): void {
    if(this.selectedItem == 'latest') {
      this.getLatestPosts();
    } else {
      this.getPosts();
    }
  }

  getPosts(): void {
      this.subscriptions.push(this.postService.getPosts().subscribe(posts => {
        this.posts = posts; }));
  }

  getLatestPosts(): void {
    this.subscriptions.push(this.postService.getLatestPosts().subscribe(posts => {
      this.posts = posts; }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
