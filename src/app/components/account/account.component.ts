import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() pageRole: string = 'COACHEE';
  user: any;

  constructor(public userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  becomeCoach(): void {
    this.userService.becomeCoach(this.user!.userId)
      .subscribe((response) => {
        console.log(response);
        const token = response.headers.get('Authorization');
        if (token !== null) {
          this.userService.setToken(token);
        }
        this.router.navigate(['/coach-profile/'])
      });
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