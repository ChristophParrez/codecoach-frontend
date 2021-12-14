import { UserRole } from "./UserRole";

export interface User {
  userId: string;
  coachInformation: any;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  roles: UserRole[]
}
