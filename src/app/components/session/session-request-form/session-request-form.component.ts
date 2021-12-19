import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../services/session.service";
import { formatDate } from "@angular/common";
import { User } from "../../../model/User";
import { Observable } from "rxjs";
import { CoachingTopic } from "../../../model/CoachingTopic";
import { AppService } from "../../../services/app.service";

@Component({
  selector: 'app-session-request-form',
  templateUrl: './session-request-form.component.html',
  styleUrls: ['./session-request-form.component.scss']
})
export class SessionRequestFormComponent implements OnInit {

  selectedTime: number | undefined
  coach: User | undefined
  coachId: string | any;
  coachingTopics: CoachingTopic[] | undefined;

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  formGroup: FormGroup = this.formBuilder.group({
    subject: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    remarks: ['integration testing in java', Validators.required],
  });

  errorMessages: string[] = [];

  constructor(
    public appService: AppService,
    private userService: UserService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.coachId = this.route.snapshot.paramMap.get('id');
    this.userService.getCoach(this.coachId).subscribe(user => this.coachingTopics = user.coachInformation.coachingTopics);
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.triggerValidationOnFields();
    } else {
      this.formGroup.disable();
      this.formGroup.value.date = formatDate(this.formGroup.value.date, "YYYY-MM-dd", "en-US");
      this.formGroup.value.location = {name: this.formGroup.value.location}
      this.formGroup.value.coachId = this.coachId;
      this.formGroup.value.coacheeId = this.userService.getUserId();

      this.sessionService.requestSession(this.formGroup.value).subscribe({
        next: () => this.router.navigate(['/user/sessions'], {relativeTo: this.route}),
        error: (response) => {
          this.formGroup.enable();
          console.log(response)
          if (typeof response.error === 'string') this.errorMessages.push(response.error);
          else if (typeof response.error.message === 'string') this.errorMessages.push(response.error.message);
          else if (response.error.status === 400) {
            this.errorMessages.push('Something went wrong. Please try again later.')
          }
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
