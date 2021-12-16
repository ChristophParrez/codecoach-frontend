import { Component, Input, OnInit } from '@angular/core';
import { Session } from "../../model/Session";
import { SessionService } from "../../services/session.service";
import { Role } from "../../model/Role";

@Component({
  selector: 'app-coaching-sessions',
  templateUrl: './coaching-sessions.component.html',
  styleUrls: ['./coaching-sessions.component.scss']
})
export class CoachingSessionsComponent implements OnInit {

  @Input() coacheeId: string | undefined;
  @Input() coachId: string | undefined;
  @Input() pageRole: Role | undefined;
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.sessionService.getSessions(this.pageRole!).subscribe({
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
