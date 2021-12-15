import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "../../model/Role";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user: any;
  @Input() userRole: Role = Role.COACHEE;
  @Output() userIsUpdated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  formGroup: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")]],
    picture: '',
    coachInformation: null
  });

  errorMessages: string[] = [];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.user) this.formGroup.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      picture: this.user.picture,
      email: this.user.email,
      coachInformation: this.user.coachInformation
    });
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.triggerValidationOnFields();
    } else {
      this.formGroup.disable();
      const userId = this.route.snapshot.paramMap.get('id');
      // const updateUserFunction = (this.userRole == Role.COACH) ? this.userService.updateCoach : this.userService.updateUser;
      this.userService.updateUser(this.formGroup.value, userId!).subscribe({
      // updateUserFunction.bind(this.userService)(this.formGroup.value, userId!).subscribe({
        next: () => this.userIsUpdated.emit(),
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
