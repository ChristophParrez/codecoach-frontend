import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    firstName: ['Mert', Validators.required],
    lastName: ['Demirok', Validators.required],
    companyName: ['Switchfully', Validators.required],
    password: ['Switchfully0', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=\\S+$).{8,}')]],
    email: ['mert1@gmail.com', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]],
    roles: [[{}]],
  });

  errorMessages: string[] = [];

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
      this.userService.registerUser(this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/'], {relativeTo: this.route}),
        error: (response) => {
          console.log(response);
          this.errorMessages.push(response.error);
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
