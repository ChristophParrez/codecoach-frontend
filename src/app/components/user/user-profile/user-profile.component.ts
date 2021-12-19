import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'src/app/model/User';
import { Role } from "../../../model/Role";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User | undefined;
  roleOfAccount: Role | undefined;

  constructor(public userService: UserService, public router: Router, public route: ActivatedRoute) {
    this.route.parent?.params.subscribe(params => {
      this.user = undefined;
      this.roleOfAccount = params['roleOfAccount']?.toUpperCase()
      this.getUser()
    });
  }

  ngOnInit(): void {
    // this.getUser();
  }

  getUser(): void {
    const getUserFunction = this.roleOfAccount === 'COACH' ? this.userService.getCoach : this.userService.getUser;
    getUserFunction.bind(this.userService)(this.userService.getUserId()).subscribe({
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
