import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {Subscription} from "rxjs";
import {Post} from "../../../../models/post";
import {PostService} from "../../../../services/post.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public user: User = new User();
  public posts: Post[] = [];

  constructor(private userService: UserService, private postService: PostService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getUser(2).subscribe(user => {
      this.user = user;
      this.getCurrentPosts(); }));
  }

  public getCurrentPosts(): void {
    this.subscriptions.push(this.postService.getPostsByUserId(this.user.id).subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    }));
  }

  public savePost(): void {
    const post: Post = new Post();
    post.description = "test";
    console.log(post);
    this.subscriptions.push(this.postService.savePost(post, this.user.id).subscribe(post => {
      console.log(post);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
