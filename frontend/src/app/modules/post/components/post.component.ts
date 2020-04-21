import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {Item} from "../../../models/item";
import {Page} from "../../../models/page";
import {Sort} from "../../../models/sort";
import {Order} from "../../../models/order";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {

  // @Input() selectedItem: string;
  public posts: Post[] = [];
  private subscriptions: Subscription[] = [];
  public page: Page = new Page();
  private selectedItem: Item;
  public selectedPage;

  constructor(private postService: PostService, private data: DataService) {
  }

  ngOnInit(): void {
    this.page.pageNumber = 1;
    this.page.pageSize = 1;
    this.page.sort = Sort.DATE;
    this.page.order = Order.ASC;
    this.subscriptions.push(this.data.currentItem.subscribe(item => { this.selectedItem = item;
                                                                              this.changeByItem()}));
  }

  ngOnChanges(changes: SimpleChanges): void {
      // this.changeByItem();
  }

  private changeByItem(): void {
    this.page.pageNumber = 0;
    if(this.selectedItem == Item.LATEST) {
      this.getLatestPosts();
    } else {
      this.getPosts();
    }
  }

  public getPosts(): void {
      this.subscriptions.push(this.postService
        .getPosts(this.page.pageNumber, this.page.pageSize, this.page.sort, this.page.order)
        .subscribe(posts => { this.posts = posts; }));
  }

  public getLatestPosts(): void {
    this.subscriptions.push(this.postService
      .getLatestPosts(this.page.pageNumber, this.page.pageSize, this.page.sort, this.page.order)
      .subscribe(posts => { this.posts = posts; }));
  }

  public next(): void {
    this.page.pageNumber++;
    if(this.selectedItem == Item.ALL) {
      this.getPosts();
    } else {
      this.getLatestPosts();
    }
  }

  public previous(): void {
    if(this.page.pageNumber > 0) {
      this.page.pageNumber--;
    }
    if(this.selectedItem == Item.ALL) {
      this.getPosts();
    } else {
      this.getLatestPosts();
    }
  }

  public goOver(selectedPage: number): void {
    if(selectedPage <= 0) {
      this.page.pageNumber = 0;
    } else {
      this.page.pageNumber = selectedPage - 1;
    }
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
