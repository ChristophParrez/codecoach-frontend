import { Component, OnInit } from '@angular/core';
import { User } from "../../model/User";
import { UserService } from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-coachee-details',
  templateUrl: './coachee-details.component.html',
  styleUrls: ['./coachee-details.component.scss']
})
export class CoacheeDetailsComponent implements OnInit {

  user: User | undefined;

  constructor(public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (user) => this.user = user,
      error: (e) => console.log(e)
    });
  }

}
