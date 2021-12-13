import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-coachee-profile',
  templateUrl: './coachee-profile.component.html',
  styleUrls: ['./coachee-profile.component.scss']
})
export class CoacheeProfileComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.route.snapshot.paramMap.get('id')!).subscribe({
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
