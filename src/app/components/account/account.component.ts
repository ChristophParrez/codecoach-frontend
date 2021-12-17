import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogData, ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { MatDialog } from '@angular/material/dialog';

export interface ConfirmDialogModel {
  title: string;
  message: string;
}

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
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  becomeCoach(): void {

    // const dialogData = new ConfirmDialogModel2("Confirm Action", message);
    const dialogData: ConfirmDialogData = {title: "Confirm Action", message: 'Are you sure you want to become a coach?'};

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      // this.result = dialogResult;
      console.log('dialog result', dialogResult);
      if (!dialogResult) return;

      this.userService.becomeCoach(this.user!.userId)
        .subscribe((response) => {
          console.log(response);
          const token = response.headers.get('Authorization');
          if (token !== null) {
            this.userService.setToken(token);
          }
          this.router.navigate(['/coach-profile/'])
        });
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
