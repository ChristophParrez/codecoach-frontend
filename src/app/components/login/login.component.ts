import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "../../services/app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    username: ['mert1@gmail.com', [Validators.required, Validators.email]],
    password: ['Switchfully0', Validators.required]
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private appService: AppService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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
            this.router.navigate(['/user-profile/'], {relativeTo: this.route})
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

}
