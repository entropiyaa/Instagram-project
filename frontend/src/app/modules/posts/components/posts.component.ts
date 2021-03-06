import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {Item} from "../../../models/enums/item";
import {Page} from "../../../models/page";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy, OnChanges {

  private subscriptions: Subscription[] = [];
  public page: Page<Post> = new Page();
  private selectedItem: Item;
  @Input() public currentUser: User;

  constructor(private postService: PostService,
              private data: DataService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getItem();
  }

  ngOnChanges(changes: SimpleChanges): void {
       this.changeByItem();
  }

  private getItem(): void {
    this.subscriptions.push(this.data.currentItem.subscribe(item => {
      this.selectedItem = item;
      this.changeByItem() }));
  }

  private changeByItem(): void {
    this.page.pageNumber = 0;
    this.getCurrentPosts();
  }

  private getCurrentPosts(): void {
    if(this.selectedItem == Item.LATEST) {
      this.getLatestPosts();
    } else {
      this.getPosts();
    }
  }

  public getPosts(): void {
    this.subscriptions.push(this.postService.getPosts(this.page).subscribe(postPage => {
        this.page.content = postPage.content;
        this.page.totalPages = postPage.totalPages; }));
  }


  public getLatestPosts(): void {
    this.subscriptions.push(this.postService.getLatestPosts(this.page).subscribe(postPage => {
      this.page.content = postPage.content;
      this.page.totalPages = postPage.totalPages; }));
  }

  onChanged(): void {
    this.getCurrentPosts();
  }

  removeFromArray(): void {
    this.getCurrentPosts();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
