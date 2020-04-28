import {User} from "./user";

export class Post {
  id: number;
  photo: string;
  description: string;
  date: string;
  hashtag: string[];
  user: User;
}
