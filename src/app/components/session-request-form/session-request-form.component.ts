import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-session-request-form',
  templateUrl: './session-request-form.component.html',
  styleUrls: ['./session-request-form.component.scss']
})
export class SessionRequestFormComponent implements OnInit {

  selectedTime: number | undefined

  formGroup: FormGroup = this.formBuilder.group({
    subject: ['Java', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['Leuven', Validators.required],
    remarks: ['integration testing in java', Validators.required],
  });

  errorMessages: string[] = [];

  constructor(private sessionService: SessionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.triggerValidationOnFields();
    } else {
      this.formGroup.disable();
      this.formGroup.value.date = formatDate(this.formGroup.value.date, "YYYY-MM-dd", "en-US");
      this.formGroup.value.location = {name: this.formGroup.value.location}

      this.sessionService.requestSession(this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/'], {relativeTo: this.route}),
        error: (response) => {
          this.formGroup.enable();
          console.log(response);
          if (response.error.status === 400) this.errorMessages.push('Something went wrong. Please try again later.')
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
