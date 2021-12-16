import { Component, OnInit } from '@angular/core';
import { Role } from "../../model/Role";
import { Session } from "../../model/Session";
import { SessionService } from "../../services/session.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-coachee-coaching-sessions',
  templateUrl: './coachee-coaching-sessions.component.html',
  styleUrls: ['./coachee-coaching-sessions.component.scss']
})
export class CoacheeCoachingSessionsComponent implements OnInit {

  role: typeof Role = Role;
  sessions: Session[] = [];


  constructor(private sessionService: SessionService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.sessionService.getSessions(Role.COACHEE).subscribe({
      next: (sessions) => {
        console.log(sessions)
        // this.sessions = sessions
        this.mapCoaches(sessions)
      },
      error: (e) => console.log(e)
    });
  }

  mapCoaches(sessions: Session[]): void {
    this.userService.getAllCoaches().subscribe({
      next: (coaches) => {
        sessions.map(session => session.coach = coaches.filter((coach) => coach.userId === session.coachId)[0]);
        this.sessions = sessions;
      },
      error: (e) => console.log(e)
    });
  }

}
