import {User} from "./user";
import {Comment} from "./comment";

export class Post {
  id: number;
  photo: any = null;
  description: string;
  date: string;
  hashtag: string[];
  user: User = new User();
  comments: Comment[] = [];
}
