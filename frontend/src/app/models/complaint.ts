import {User} from "./user";
import {Post} from "./post";
import {ComplaintStatus} from "./enums/complaint-status";

export class Complaint {
  id: number;
  cause: string;
  date: string;
  status: ComplaintStatus;
  user: User = new User();
  post: Post = new Post();
}
