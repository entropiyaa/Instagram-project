import {User} from "./user";
import {Post} from "./post";
import {ReactionType} from "./reaction-type";

export class Reaction {
  id: number;
  date: string;
  reaction: ReactionType;
  user: User = new User();
  post: Post = new Post();
}
