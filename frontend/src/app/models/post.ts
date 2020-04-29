import {User} from "./user";

export class Post {
  id: number;
  photo: any = null;
  description: string;
  date: string;
  hashtag: string[];
  user: User = new User();
}
