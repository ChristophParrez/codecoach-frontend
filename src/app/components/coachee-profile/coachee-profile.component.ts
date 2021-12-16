import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-coachee-profile',
  templateUrl: './coachee-profile.component.html',
  styleUrls: ['./coachee-profile.component.scss']
})
export class CoacheeProfileComponent implements OnInit {

  user: any;

  constructor(public userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.userService.getUserId()).subscribe({
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
