import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    username: ['freeh23@gmail.com', Validators.required],
    password: ['String12!', Validators.required]
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

          const keys = response.headers.keys();
          const headers = keys.map((key: any) =>
            `${key}: ${response.headers.get(key)}`);
          let token = headers[0].split(' ')[2]
          console.log(headers)
          console.log(token)
          sessionStorage.setItem("codecoach_token", token)
          const userId = this.userService.getUserId();
          this.router.navigate([`/users/${userId}`], {relativeTo: this.route})
        },
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
