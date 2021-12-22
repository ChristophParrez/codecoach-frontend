import { SessionStatus } from "./SessionStatus";
import { Location } from "./Location";
import { User } from "./User";
import {Feedback} from "./Feedback";

export interface Session {
  id: string;
  coachId: string;
  coacheeId: string;
  coachee: User;
  coach: User;
  subject: string;
  date: Date;
  time: number;
  location: Location;
  remarks:string;
  status: SessionStatus;
  coacheeFeedback: Feedback,
  coachFeedback: Feedback
}
