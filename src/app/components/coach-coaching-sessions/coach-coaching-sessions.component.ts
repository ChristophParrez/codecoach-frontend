import { Component, OnInit } from '@angular/core';
import { Role } from "../../model/Role";

@Component({
  selector: 'app-coach-coaching-sessions',
  templateUrl: './coach-coaching-sessions.component.html',
  styleUrls: ['./coach-coaching-sessions.component.scss']
})
export class CoachCoachingSessionsComponent implements OnInit {

  role: typeof Role = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
