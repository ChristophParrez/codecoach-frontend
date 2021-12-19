import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../../model/User";
import { Role } from "../../../model/Role";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.scss']
})
export class CoachDetailsComponent implements OnInit {

  user: User | undefined;

  constructor(public userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getCoach(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (user) => this.user = user,
      error: (e) => console.log(e)
    });
  }

}
