import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ReactionService} from "../../../services/reaction.service";
import {Reaction} from "../../../models/reaction";
import {ReactionType} from "../../../models/enums/reaction-type";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public reactionsLike: Reaction[] = [];
  public reactionsDislike: Reaction[] = [];
  @Input() private postId: number;
  private user: User = new User();
  public isLike: boolean = false;
  public isDislike: boolean = false;
  private currentReaction: Reaction = new Reaction();

  constructor(private reactionService: ReactionService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getCurrentReaction();
    this.getReactionsByPostIdLike();
    this.getReactionsByPostIdDislike();
  }

  public getCurrentReaction(): void {
    this.subscriptions.push(this.reactionService.getReactionByUserIdAndPostId(this.user.id, this.postId)
      .subscribe(reaction => {
        this.currentReaction = reaction;
        this.checkReaction();
      }))
  }

  public getReactionsByPostIdLike(): void {
    this.subscriptions.push(this.reactionService
      .getReactionsByPostIdAndType(this.postId, ReactionType.LIKE).subscribe(reactions => {
        this.reactionsLike = reactions;
      }));
  }

  public getReactionsByPostIdDislike(): void {
    this.subscriptions.push(this.reactionService
      .getReactionsByPostIdAndType(this.postId, ReactionType.DISLIKE).subscribe(reactions => {
        this.reactionsDislike = reactions;
      }));
  }

  public saveReaction(reactionType: ReactionType): void {
    const newReaction: Reaction = this.createReaction(reactionType);
    this.subscriptions.push(this.reactionService.saveReaction(newReaction).subscribe(reaction => {
      this.currentReaction = reaction;
      this.pushToArray(this.currentReaction);
    }));
  }

  public createReaction(reactionType: ReactionType): Reaction {
    const newReaction = new Reaction();
    newReaction.reaction = reactionType;
    newReaction.user.id = this.user.id;
    newReaction.post.id = this.postId;
    return newReaction;
  }

  public pushToArray(reaction: Reaction): void {
    if(reaction.reaction == ReactionType.LIKE) {
      this.reactionsLike.push(reaction);
    } else {
      this.reactionsDislike.push(reaction);
    }
  }

  public checkReaction(): void {
    if(this.currentReaction != null) {
      if(this.currentReaction.reaction == ReactionType.LIKE) {
        this.isLike = true;
      } else {
        this.isDislike = true;
      }
    }
  }

  public like(): void {
    this.isLike = !this.isLike;
    if(this.isLike) {
      if(this.isDislike) {
        this.removeFromArray(this.currentReaction);
        this.isDislike = false;
      }
      this.saveReaction(ReactionType.LIKE);
    } else {
      this.deleteReaction(this.currentReaction);
    }
  }

  public dislike(): void {
    this.isDislike = !this.isDislike;
    if(this.isDislike) {
      if(this.isLike) {
        this.removeFromArray(this.currentReaction);
        this.isLike = false;
      }
      this.saveReaction(ReactionType.DISLIKE);
    } else {
      this.deleteReaction(this.currentReaction);
    }
  }

  public removeFromArray(reaction: Reaction): void {
    if(reaction.reaction == ReactionType.LIKE) {
      const index = this.contains(this.reactionsLike, reaction);
      if(index > -1) {
        this.reactionsLike.splice(index, 1);
      }
    } else {
      const index = this.contains(this.reactionsDislike, reaction);
      if(index > -1) {
        this.reactionsDislike.splice(index, 1);
      }
    }
  }

  public deleteReaction(reaction: Reaction): void {
    this.subscriptions.push(this.reactionService.deleteReaction(reaction.id).subscribe(() => {
      console.log("delete reaction success!!");
      this.removeFromArray(reaction);
    }))
  }

  public contains(arr: Reaction[], obj: Reaction): number {
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
