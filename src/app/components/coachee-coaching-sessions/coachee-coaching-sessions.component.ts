import { Component, OnInit } from '@angular/core';
import { Role } from "../../model/Role";
import { Session } from "../../model/Session";
import { SessionService } from "../../services/session.service";
import { UserService } from "../../services/user.service";
import { SessionTableType } from "../../model/SessionTableType";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-coachee-coaching-sessions',
  templateUrl: './coachee-coaching-sessions.component.html',
  styleUrls: ['./coachee-coaching-sessions.component.scss']
})
export class CoacheeCoachingSessionsComponent implements OnInit {

  roleOfAccount: Role | undefined;
  role: typeof Role = Role;
  type: typeof SessionTableType = SessionTableType;
  sessions: Session[] | undefined;

  constructor(private sessionService: SessionService, private userService: UserService, public router: Router, public route: ActivatedRoute) {
    this.route.parent?.params.subscribe(params => {
      this.sessions = undefined;
      this.roleOfAccount = params['roleOfAccount']?.toUpperCase();
      this.getSessions();
    });
  }

  ngOnInit(): void {
    // this.getSessions();
  }

  getSessions(): void {
    this.sessionService.getSessions(this.roleOfAccount!).subscribe({
      next: (sessions) => {
        this.sessions = sessions
      },
      error: (e) => console.log(e)
    });
  }

}
