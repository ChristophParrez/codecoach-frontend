import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../model/User";

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  user: User | undefined;

  constructor(public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
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
