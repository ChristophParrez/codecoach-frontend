import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    username: ['mert1@gmail.com', Validators.required],
    password: ['Switchfully0', Validators.required]
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.triggerValidationOnFields();
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
          const message = (typeof response.error.message === 'string') ? response.error.message : 'Something went wrong. Please try again.'
          this.errorMessages.push(message);
          this.formGroup.enable();
        }
      });
    }
  }

  private triggerValidationOnFields(formGroup?: FormGroup | FormArray): void {
    if (formGroup == null) formGroup = this.formGroup;
    Object.keys(formGroup.controls).forEach(field => {
      // @ts-ignore
      const control = formGroup.controls[field];
      if (control instanceof FormGroup || control instanceof FormArray) this.triggerValidationOnFields(control);
      else control.markAsTouched({onlySelf: true});
    });
  }

}
