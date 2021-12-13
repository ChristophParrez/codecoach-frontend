import { UserRole } from "./UserRole";

export interface User {
  coachInformation: any;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  roles: UserRole[]
}
