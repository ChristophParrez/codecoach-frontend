import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogData, ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";
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
  pageRoleNew: string | undefined;

  constructor(public userService: UserService,
              public route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
    this.router.events.subscribe(() => {
      this.pageRole = this.route.snapshot.paramMap.get('roleOfAccount')?.toUpperCase()!;
    });
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) this.router.navigate(['login']).then();
    else this.getUser();

  }

  becomeCoach(): void {
    const dialogData: ConfirmDialogData = {title: "Confirm Action", message: 'Are you sure you want to become a coach?'};
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) return;
      this.userService.becomeCoach(this.user!.userId)
        .subscribe((response) => {
          console.log(response)
          const token = response.headers.get('Authorization');
          if (token !== null) {
            this.userService.setToken(token);
          }
          this.router.navigate(['account/coach', { outlets: { view: 'profile' } }]).then();
        });
    });
  }

  getUser(): void {
    this.userService.getUser(this.userService.getUserId()).subscribe({
      next: (user) => {
        this.user = user
      },
      error: (e) => console.log(e),
      complete: () => {
      }
    });
  }

}
