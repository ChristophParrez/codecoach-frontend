import { UserRole } from "./UserRole";
import { CoachInformation } from "./CoachInformation";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  roles: UserRole[];
  picture: string;
  coachInformation: CoachInformation;
}
