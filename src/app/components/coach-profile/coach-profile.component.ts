import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../model/User";
import { Role } from "../../model/Role";

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  user: User | undefined;
  roles: typeof Role = Role;

  constructor(public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
    console.log('type of role = ', typeof Role);
  }

  getUser(): void {
    this.userService.getCoach(this.route.snapshot.paramMap.get('id')!).subscribe({
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
