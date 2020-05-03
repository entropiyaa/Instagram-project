import {User} from "./user";
import {Post} from "./post";

export class Comment {
  id: number;
  text: string;
  date: string;
  user: User = new User();
  post: Post = new Post();
}
