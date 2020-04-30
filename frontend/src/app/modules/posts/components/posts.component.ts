import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {Item} from "../../../models/item";
import {Page} from "../../../models/page";
import {Sort} from "../../../models/sort";
import {Order} from "../../../models/order";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy, OnChanges {

  private subscriptions: Subscription[] = [];
  public page: Page<Post> = new Page();
  private selectedItem: Item;
  public selectedPage;
  public post: Post = new Post();
  private user: User = new User();

  constructor(private postService: PostService, private data: DataService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getUser(1).subscribe(user => { this.user = user; }));
    this.subscriptions.push(this.data.currentItem.subscribe(item => { this.selectedItem = item;
                                                                              this.changeByItem() }));
  }

  ngOnChanges(changes: SimpleChanges): void {
       this.changeByItem();
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
        .subscribe(postPage => {  console.log(postPage);
                                       this.page.content = postPage.content;
                                       this.page.totalPages = postPage.totalPages; }));
  }

  public getLatestPosts(): void {
    this.subscriptions.push(this.postService
      .getLatestPosts(this.page.pageNumber, this.page.pageSize, this.page.sort, this.page.order)
      .subscribe(postPage => { console.log(postPage);
                                     this.page.content = postPage.content;
                                     this.page.totalPages = postPage.totalPages; }));
  }

  public next(): void {
    if(this.page.pageNumber < this.page.totalPages - 1) {
      this.page.pageNumber++;
      if (this.selectedItem == Item.ALL) {
        this.getPosts();
      } else {
        this.getLatestPosts();
      }
    }
  }

  public previous(): void {
    if(this.page.pageNumber > 0) {
      this.page.pageNumber--;
      if (this.selectedItem == Item.ALL) {
        this.getPosts();
      } else {
        this.getLatestPosts();
      }
    }
  }

  public goOver(selectedPage: number): void {
    if(selectedPage < 1) {
      this.page.pageNumber = 0;
    } else if(selectedPage > this.page.totalPages) {
      this.page.pageNumber = this.page.totalPages - 1;
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
