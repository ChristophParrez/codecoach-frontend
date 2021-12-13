import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../model/User";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user: any;
  @Output() toggleEditMode = new EventEmitter<any>();

  formGroup: FormGroup = this.formBuilder.group({
    firstName: ['Mert', Validators.required],
    lastName: ['Demirok', Validators.required],
    picture: '',
    email: ['mert1@gmail.com', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]]
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
      const userId = this.route.snapshot.paramMap.get('id');
      this.userService.updateUser(this.formGroup.value, userId!).subscribe({
        next: () => this.toggleEditMode.emit(),
        error: (response) => {
          console.log(response);
          if (response.status === 401 || response.status === 403) {
            this.errorMessages.push('You are not authorized to use this function')
          }
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
