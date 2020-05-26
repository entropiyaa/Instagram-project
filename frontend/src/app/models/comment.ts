import {User} from "./user";
import {Post} from "./post";

export class Comment {
  id: number;
  text: string;
  date: string;
  user: User = new User();
  post: Post = new Post();

  constructor(text?: string, userId?: number, postId?: number) {
    this.text = text;
    this.user.id = userId;
    this.post.id = postId;
  }
}
