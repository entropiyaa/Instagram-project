import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {Item} from "../../../models/item";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {

  // @Input() selectedItem: string;
  public posts: Post[] = [];
  private subscriptions: Subscription[] = [];
  private selectedItem: Item;
  public selectedPage;

  pageNumber: number = 0;
  pageSize: number = 1;

  constructor(private postService: PostService, private data: DataService) {
  }

  ngOnInit(): void {
     this.subscriptions.push(this.data.currentItem.subscribe(item => { this.selectedItem = item;
                                                                              this.changeByItem()}));
  }

  ngOnChanges(changes: SimpleChanges): void {
      // this.changeByItem();
  }

  private changeByItem(): void {
    this.pageNumber = 0;
    if(this.selectedItem == Item.LATEST) {
      this.getLatestPosts();
    } else {
      this.getPosts();
    }
  }

  public getPosts(): void {
      this.subscriptions.push(this.postService.getPosts(this.pageNumber, this.pageSize)
                                              .subscribe(posts => { this.posts = posts; }));
  }

  public getLatestPosts(): void {
    this.subscriptions.push(this.postService.getLatestPosts(this.pageNumber, this.pageSize)
                                            .subscribe(posts => { this.posts = posts; }));
  }

  public next(): void {
    this.pageNumber++;
    if(this.selectedItem == Item.ALL) {
      this.getPosts();
    } else {
      this.getLatestPosts();
    }
  }

  public previous(): void {
    if(this.pageNumber > 0) {
      this.pageNumber--;
    }
    if(this.selectedItem == Item.ALL) {
      this.getPosts();
    } else {
      this.getLatestPosts();
    }
  }

  public goOver(selectedPage: number): void {
    this.pageNumber = selectedPage;
    if(this.selectedItem == Item.ALL) {
      this.getPosts();
    } else {
      this.getLatestPosts();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
