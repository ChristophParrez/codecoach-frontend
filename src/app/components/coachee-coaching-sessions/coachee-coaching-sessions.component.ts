import { Component, OnInit } from '@angular/core';
import { Role } from "../../model/Role";

@Component({
  selector: 'app-coachee-coaching-sessions',
  templateUrl: './coachee-coaching-sessions.component.html',
  styleUrls: ['./coachee-coaching-sessions.component.scss']
})
export class CoacheeCoachingSessionsComponent implements OnInit {

  role: typeof Role = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
