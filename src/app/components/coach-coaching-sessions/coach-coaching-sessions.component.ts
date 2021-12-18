import { Component, OnInit } from '@angular/core';
import { Role } from "../../model/Role";
import { Session } from "../../model/Session";
import { SessionService } from "../../services/session.service";
import { SessionTableType } from "../../model/SessionTableType";

@Component({
  selector: 'app-coach-coaching-sessions',
  templateUrl: './coach-coaching-sessions.component.html',
  styleUrls: ['./coach-coaching-sessions.component.scss']
})
export class CoachCoachingSessionsComponent implements OnInit {

  role: typeof Role = Role;
  type: typeof SessionTableType = SessionTableType;
  sessions: Session[] | undefined;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.sessionService.getSessions(Role.COACH).subscribe({
      next: (sessions) => {
        console.log(sessions)
        this.sessions = sessions
      },
      error: (e) => console.log(e),
      complete: () => {
      }
    });
  }

}
