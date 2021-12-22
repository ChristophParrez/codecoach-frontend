import { UserRole } from "./UserRole";
import { CoachInformation } from "./CoachInformation";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  email: string;
  companyName: string;
  roles: UserRole[];
  picture: string;
  coachInformation: CoachInformation;
}
