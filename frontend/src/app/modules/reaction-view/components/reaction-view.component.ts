import {Component, Input, OnInit} from '@angular/core';
import {Reaction} from "../../../models/reaction";
import {Subscription} from "rxjs";
import {User} from "../../../models/user";
import {ReactionService} from "../../../services/reaction.service";
import {AuthService} from "../../../services/auth.service";
import {ReactionType} from "../../../models/enums/reaction-type";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-reaction-view',
  templateUrl: './reaction-view.component.html',
  styleUrls: ['./reaction-view.component.css']
})
export class ReactionViewComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public reactionsLike: Reaction[] = [];
  public reactionsDislike: Reaction[] = [];
  private postId: number;
  private user: User;
  private currentReaction: Reaction = new Reaction();

  constructor(private reactionService: ReactionService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) {}

  ngOnInit(): void {
    this.getRouteParam();
  }

  private getRouteParam(): void {
    this.user = this.authService.getCurrentUser();
    this.postId = this.route.snapshot.params.id;
    this.checkIdValid();
  }

  private checkIdValid(): void {
    this.subscriptions.push(this.postService.getPost(this.postId).subscribe(() => {
      this.getCurrentReaction();
      this.getReactionsByPostIdLike();
      this.getReactionsByPostIdDislike();
    }, () => {
      this.router.navigate(['**']);
      }))
  }

  private getCurrentReaction(): void {
    this.subscriptions.push(this.reactionService.getReactionByUserIdAndPostId(this.user.id, this.postId)
      .subscribe(reaction => {
        this.currentReaction = reaction;
      }))
  }

  private getReactionsByPostIdLike(): void {
    this.subscriptions.push(this.reactionService
      .getReactionsByPostIdAndType(this.postId, ReactionType.LIKE).subscribe(reactions => {
        this.reactionsLike = reactions;
      }));
  }

  private getReactionsByPostIdDislike(): void {
    this.subscriptions.push(this.reactionService
      .getReactionsByPostIdAndType(this.postId, ReactionType.DISLIKE).subscribe(reactions => {
        this.reactionsDislike = reactions;
      }));
  }

  private saveReaction(reactionType: ReactionType): void {
    const newReaction: Reaction = new Reaction(reactionType, this.user.id, this.postId);
    this.subscriptions.push(this.reactionService.saveReaction(newReaction).subscribe(reaction => {
      this.currentReaction = reaction;
      this.pushToArray(this.currentReaction);
    }));
  }

  private pushToArray(reaction: Reaction): void {
    if(reaction.reaction == ReactionType.LIKE) {
      this.reactionsLike.push(reaction);
    } else {
      this.reactionsDislike.push(reaction);
    }
  }

  public like(): void {
    if(this.currentReaction !== null) {
      if(this.currentReaction.reaction === ReactionType.LIKE) {
        this.deleteReaction(this.currentReaction);
      } else {
        this.removeFromArray(this.currentReaction);
        this.saveReaction(ReactionType.LIKE);
      }
    } else {
      this.saveReaction(ReactionType.LIKE);
    }
  }

  public dislike() {
    if(this.currentReaction !== null) {
      if(this.currentReaction.reaction === ReactionType.DISLIKE) {
        this.deleteReaction(this.currentReaction);
      } else {
        this.removeFromArray(this.currentReaction);
        this.saveReaction(ReactionType.DISLIKE);
      }
    } else {
      this.saveReaction(ReactionType.DISLIKE);
    }
  }

  private removeFromArray(reaction: Reaction): void {
    if(reaction.reaction == ReactionType.LIKE) {
      const index = ReactionViewComponent.contains(this.reactionsLike, reaction);
      if(index > -1) {
        this.reactionsLike.splice(index, 1);
      }
    } else {
      const index = ReactionViewComponent.contains(this.reactionsDislike, reaction);
      if(index > -1) {
        this.reactionsDislike.splice(index, 1);
      }
    }
  }

  private deleteReaction(reaction: Reaction): void {
    this.subscriptions.push(this.reactionService.deleteReaction(reaction.id).subscribe(() => {
      this.removeFromArray(reaction);
      this.currentReaction = null;
    }))
  }

  private static contains(arr: Reaction[], obj: Reaction): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === obj.id) {
        return i;
      }
    }
    return -1;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
