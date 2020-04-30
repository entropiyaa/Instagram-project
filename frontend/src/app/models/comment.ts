import {User} from "./user";

export class Comment {
  id: number;
  text: string;
  date: string;
  user: User;
  postId: number;
}
