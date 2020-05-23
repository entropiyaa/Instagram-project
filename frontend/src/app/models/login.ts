import {User} from "./user";

export class Login {
  id: number;
  email: string;
  password: string;
  user: User;

  constructor(email?: string, password?: string, user?: User) {
    this.email = email;
    this.password = password;
    this.user = user;
  }
}
