import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=\\S+$).{8,}')]],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit fired');
    if (this.formGroup.invalid) {
      this.triggerValidationOnFields();
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
