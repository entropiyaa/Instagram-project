import {Role} from "./enums/role";

export class User {
 id: number;
 username: string;
 firstName: string;
 lastName: string;
 bio: string;
 role: Role;
 status: string;
 photo: any = null;

 constructor(username?: string, firstName?: string, lastName?: string, bio?: string, photo?: any) {
   this.username = username;
   this.firstName = firstName;
   this.lastName = lastName;
   this.bio = bio;
   this.photo = photo;
 }
}
