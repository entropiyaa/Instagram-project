import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";
// import {Page} from "../../../models/page";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {

  // public pagePost: Page<Post>;
  public posts: Post[] = [];
  public subscriptions: Subscription[] = [];
  @Input() selectedItem: string;

  pageNumber: number = 0;
  pageSize: number = 1;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.changeByItem();
  }

  changeByItem(): void {
    // if(this.selectedItem == 'latest') {
    //   this.getLatestPosts();
    // } else {
    //   this.getPosts();
    // }
  }

  getPosts(): void {
      this.subscriptions.push(this.postService.getPosts(this.pageNumber, this.pageSize)
                                              .subscribe(posts => { this.posts = posts;
                                              console.log(posts)}));
  }

  // getLatestPosts(): void {
  //   this.subscriptions.push(this.postService.getLatestPosts().subscribe(posts => {
  //     this.posts = posts; }));
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
