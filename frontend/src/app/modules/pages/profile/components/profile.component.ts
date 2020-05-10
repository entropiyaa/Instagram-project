import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {Subscription} from "rxjs";
import {Post} from "../../../../models/post";
import {PostService} from "../../../../services/post.service";
import {Page} from "../../../../models/page";
import {StorageService} from "../../../../services/storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public page: Page<Post> = new Page();
  public user: User = new User();
  public imgURL: any;
  public description: string;

  constructor(private storageService: StorageService,
              private postService: PostService) {}

  ngOnInit(): void {
    this.user = this.storageService.getCurrentUser();
    this.getPostsByUserId();
  }

  public getPostsByUserId(): void {
    this.subscriptions.push(this.postService.getPostsByUserId(this.user.id, this.page).subscribe(page => {
      this.page.content = page.content;
      this.page.totalPages = page.totalPages;
      console.log(page);
    }));
  }

  public onFileChanged(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  public savePost(): void {
    const post: Post = new Post();
    post.description = this.description;
    post.photo = this.imgURL;
    post.user.id = this.user.id;
    console.log(post);
    this.subscriptions.push(this.postService.savePost(post).subscribe(post => {
      console.log(post);
      this.getPostsByUserId();
      this.imgURL = null;
    }));
  }

  onChanged(): void {
    this.getPostsByUserId();
  }

  removeFromArray(): void {
    this.getPostsByUserId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
