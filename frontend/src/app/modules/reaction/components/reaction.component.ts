import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ReactionService} from "../../../services/reaction.service";
import {ReactionType} from "../../../models/enums/reaction-type";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {Reaction} from "../../../models/reaction";

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css']
})
export class ReactionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Input() public postId: number;
  private user: User;
  public likeCount: number;
  public dislikeCount: number;
  public currentReaction: Reaction = null;

  constructor(private reactionService: ReactionService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.getReactionsCount(ReactionType.LIKE);
    this.getReactionsCount(ReactionType.DISLIKE);
    this.getCurrentReaction();
  }

  private getReactionsCount(reactionType: ReactionType): void {
    this.subscriptions.push(this.reactionService.getReactionsCount(this.postId, reactionType)
      .subscribe(count => {
        if(reactionType === ReactionType.LIKE) {
          this.likeCount = count;
        } else {
          this.dislikeCount = count;
        }
      }));
  }

  private getCurrentReaction(): void {
      this.subscriptions.push(this.reactionService.getReactionByUserIdAndPostId(this.user.id, this.postId)
        .subscribe(reaction => {
          this.currentReaction = reaction;
        }))
  }

  public like(): void {
    if(this.currentReaction !== null) {
      if (this.currentReaction.reaction === ReactionType.LIKE) {
        this.deleteReaction(this.currentReaction);
      } else {
        this.saveReaction(ReactionType.LIKE);
        this.dislikeCount--;
      }
    } else {
      this.saveReaction(ReactionType.LIKE);
    }
  }

  public dislike(): void {
    if(this.currentReaction !== null) {
      if (this.currentReaction.reaction === ReactionType.DISLIKE) {
        this.deleteReaction(this.currentReaction);
      } else {
        this.saveReaction(ReactionType.DISLIKE);
        this.likeCount--;
      }
    } else {
      this.saveReaction(ReactionType.DISLIKE);
    }
  }

  private saveReaction(reactionType: ReactionType): void {
    const newReaction: Reaction = new Reaction(reactionType, this.user.id, this.postId);
    this.subscriptions.push(this.reactionService.saveReaction(newReaction)
      .subscribe(reaction => {
      this.currentReaction = reaction;
      this.changeCount(reactionType, 1);
    }));
  }

  private changeCount(reactionType: ReactionType, digit: number) {
    if(reactionType == ReactionType.LIKE) {
      this.likeCount += digit;
    }
    else {
      this.dislikeCount += digit;
    }
  }

  private deleteReaction(reaction: Reaction): void {
    this.subscriptions.push(this.reactionService.deleteReaction(reaction.id)
      .subscribe(() => {
        this.currentReaction = null;
        this.changeCount(reaction.reaction, -1);
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
