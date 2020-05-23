import {Role} from "./enums/role";

export class User {
 id: number;
 username: string;
 firstName: string;
 lastName: string;
 bio: string;
 role: Role;
 status: string;

 // constructor() {}

 constructor(username?: string, firstName?: string, lastName?: string, bio?: string) {
   this.username = username;
   this.firstName = firstName;
   this.lastName = lastName;
   this.bio = bio;
 }
}
