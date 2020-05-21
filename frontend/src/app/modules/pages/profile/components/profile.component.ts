import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {Post} from "../../../../models/post";
import {PostService} from "../../../../services/post.service";
import {Page} from "../../../../models/page";
import {StorageService} from "../../../../services/storage.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createHasError, HasErrorFunction} from "../../../../util/has-error";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public page: Page<Post> = new Page();
  public user: User;
  public currentUser: User;
  private profileId: number;

  public postForm: FormGroup;
  public imgURL: any;
  public hasError: HasErrorFunction;
  public visibilityNewPost: boolean = false;

  constructor(private storageService: StorageService,
              private postService: PostService,
              private route: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getRouteParam();
  }

  public createForm(): void {
    this.postForm = this.fb.group({
      description: ['',  [Validators.required, Validators.maxLength(300)]],
      imgUrl: ['', Validators.required],
    });
    this.hasError = createHasError(this.postForm);
    this.visibilityNewPost = true;
  }

  private getRouteParam(): void {
    this.subscriptions.push(this.route.queryParamMap.pipe(
      switchMap(params =>
        params.getAll('id'))).subscribe( id => {
      this.profileId = Number(id);
      this.getUserProfile();
    }));
  }

  private getUserProfile(): void {
    this.subscriptions.push(this.userService.getUser(this.profileId).subscribe(user => {
      this.user = user;
      this.getPostsByUserId();
    }));
  }

  private getCurrentUser(): void {
    this.subscriptions.push(this.storageService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    }));
  }

  public getPostsByUserId(): void {
    this.subscriptions.push(this.postService.getPostsByUserId(this.profileId, this.page)
      .subscribe(page => {
      this.page.content = page.content;
      this.page.totalPages = page.totalPages;
    }));
  }

  public checkUsers(): boolean {
    if(this.user && this.currentUser) {
      return this.user.id === this.currentUser.id;
    }
  }

  public onFileChanged(event) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  private savePost(): void {
    const formValue = this.postForm.value;
    const post: Post = new Post();
    post.description = formValue.description;
    post.photo = this.imgURL;
    post.user.id = this.user.id;
    this.subscriptions.push(this.postService.savePost(post).subscribe(post => {
      this.getPostsByUserId();
      this.clear();
    }));
  }

  public clear(): void {
    this.visibilityNewPost = false;
    this.imgURL = null;
    this.postForm.reset();
  }

  public onSubmit() {
    if(this.postForm.valid && this.imgURL != null) {
      this.savePost();
    }
  }

  public removeFromArray(): void {
    this.getPostsByUserId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
