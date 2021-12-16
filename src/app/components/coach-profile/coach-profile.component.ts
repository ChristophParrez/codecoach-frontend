import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  user: any;

  constructor(public userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getCoach(this.userService.getUserId()).subscribe({
      next: (user) => {
        console.log(user)
        this.user = user
      },
      error: (e) => console.log(e),
      complete: () => {
      }
    });
  }
}
