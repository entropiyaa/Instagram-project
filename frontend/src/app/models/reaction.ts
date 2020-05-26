import {User} from "./user";
import {Post} from "./post";
import {ReactionType} from "./enums/reaction-type";

export class Reaction {
  id: number;
  date: string;
  reaction: ReactionType;
  user: User = new User();
  post: Post = new Post();

  constructor(reaction?: ReactionType, userId?: number, postId?: number) {
    this.reaction = reaction;
    this.user.id = userId;
    this.post.id = postId;
  }
}
