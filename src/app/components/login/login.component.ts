import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "../../services/app.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent, AlertDialogData } from "../dialogs/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private appService: AppService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) this.router.navigate(['account/coachee', { outlets: { view: 'profile' } }]).then()
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.errorMessages.push('Please provide a valid email and password.')
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      this.userService.loginUser(this.formGroup.value).subscribe({
        next: (response) => {
          const token = response.headers.get('Authorization');
          if (token !== null) {
            this.userService.setToken(token);
            this.userService.getUserName();
            this.router.navigate(['account/coachee', { outlets: { view: 'profile' } }]).then();
          }
        },
        error: (response) => {
          console.log(response);
          let message = (typeof response.error.message === 'string') ? response.error.message : 'Something went wrong. Please try again.'
          if (response.status === 401 || response.status === 403) {
            message = 'The combination of email and password is incorrect.';
            // message = undefined;
            // this.snackBar.open('The combination of email and password is incorrect. Please try again.', 'Okay'); // test
          }
          if (message) this.errorMessages.push(message);
          this.formGroup.enable();
        }
      });
    }
  }

  resetPassword() {
    const dialogData: AlertDialogData = {title: "Reset Password", message: 'Please contact your system administrator to reset your password.'};
    this.dialog.open(AlertDialogComponent, {
      maxWidth: "600px",
      data: dialogData,
      autoFocus: false,
      // disableClose: true
    });
  }
}
