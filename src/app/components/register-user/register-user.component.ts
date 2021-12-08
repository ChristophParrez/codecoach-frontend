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
    companyName: ['Switchfully'],
    password: ['Switchfully0', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=\\S+$).{8,}')]],
    email: ['mert1@gmail.com', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]],
    roles: [[{

    }]],
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.triggerValidationOnFields();
    } else {
      console.log('calling user service');
      console.log(this.formGroup.value);
      this.formGroup.disable();
      this.userService.registerUser(this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/'], {relativeTo: this.route }),
        error: () => this.formGroup.enable()
      });
    }
  }

  private triggerValidationOnFields(formGroup?: FormGroup | FormArray): void {
    console.log('validation...');
    if (formGroup == null) formGroup = this.formGroup;
    Object.keys(formGroup.controls).forEach(field => {
      // @ts-ignore
      const control = formGroup.controls[field];
      if (control instanceof FormGroup || control instanceof FormArray) this.triggerValidationOnFields(control);
      else control.markAsTouched({onlySelf: true});
    });
  }

}
