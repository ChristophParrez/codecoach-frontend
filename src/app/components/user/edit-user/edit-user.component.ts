import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "../../../model/Role";
import { UserRole } from "../../../model/UserRole";
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user: any;
  // @Input() userRole: Role = Role.COACHEE;
  @Output() userIsUpdated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  formGroup: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]],
    picture: '',
    telephoneNumber: ['', Validators.pattern("(\\+32)\\d{9}")],
    coachInformation: null,
    roles: null,
  });

  errorMessages: string[] = [];
  userRoles: typeof Role = Role;

  constructor(public userService: UserService,
              private appService: AppService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.user) this.formGroup.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      picture: this.user.picture,
      email: this.user.email,
      telephoneNumber: this.user.telephoneNumber,
      coachInformation: this.user.coachInformation,
      roles: this.user.roles?.map((role: UserRole) => role.role),
    });
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      this.formGroup.value.roles = this.formGroup.value.roles?.map((role: string) => {
        return {role: role}
      });
      this.userService.updateUser(this.formGroup.value, this.user.userId).subscribe({
        next: () => this.userIsUpdated.emit(),
        error: (response) => {
          console.log(response);
          if (response.status === 401 || response.status === 403) {
            this.errorMessages.push('You are not authorized to use this function')
          } else if (response.status === 400) {
            if (typeof response.error.message === 'string') this.errorMessages.push(response.error.message);
          }
          this.formGroup.enable();
        }
      });
    }
  }

}
