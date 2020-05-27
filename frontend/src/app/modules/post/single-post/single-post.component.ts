import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {User} from "../../../models/user";
import {Role} from "../../../models/enums/role";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public postId: number;
  public post: Post;
  public user: User;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getRouteParam();
  }

  private getRouteParam(): void {
    this.subscriptions.push(this.route.queryParamMap.pipe(
      switchMap(params =>
        params.getAll('id'))).subscribe( id => {
      this.checkIdValid();
    }));
  }

  private checkIdValid(): void {
    this.subscriptions.push(this.postService.getPost(this.postId)
      .subscribe(post => {
        this.post = post;
      }, () => {
        this.router.navigate(['**']);
      }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
