import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../../services/app.service";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: ['', Validators.required],
    telephoneNumber: ['', Validators.pattern("(\\+32)\\d{9}")],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=\\S+$).{8,}')]],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]],
    roles: [[{}]],
  });

  errorMessages: string[] = [];

  constructor(public appService: AppService,
              private userService: UserService,
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
      this.userService.registerUser(this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/login'], {relativeTo: this.route}),
        error: (response) => {
          this.formGroup.enable();
          console.log(response);
          if (response.error.status === 400) {
            if (typeof response.error.message === 'string') this.errorMessages.push(response.error.message);
            else this.errorMessages.push('Something went wrong. Please try again later.')
          }
          else if (typeof response.error === 'string') this.errorMessages.push(response.error);
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
