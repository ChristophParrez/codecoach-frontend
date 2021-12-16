import { SessionStatus } from "./SessionStatus";
import { Location } from "./Location";
import { User } from "./User";

export interface Session {
  coachId: string;
  coach: User;
  subject: string;
  date: Date;
  time: number;
  location: Location;
  remarks:string;
  status: SessionStatus;
}
