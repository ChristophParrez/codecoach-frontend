import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../services/session.service";
import { User } from "../../../model/User";
import { CoachingTopic } from "../../../model/CoachingTopic";
import { AppService } from "../../../services/app.service";
import * as moment from 'moment';

@Component({
  selector: 'app-session-request-form',
  templateUrl: './session-request-form.component.html',
  styleUrls: ['./session-request-form.component.scss']
})
export class SessionRequestFormComponent implements OnInit {

  selectedTime: number | undefined
  coach: User | undefined;
  // coachingTopics: CoachingTopic[] | undefined;
  showForm: boolean = true;
  reason: string = '';

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  formGroup: FormGroup = this.formBuilder.group({
    subject: ['', Validators.required],
    date: ['', Validators.required],
    time: [''],
    location: ['', Validators.required],
    remarks: ['']
  });

  errorMessages: string[] = [];

  constructor(
    public appService: AppService,
    public userService: UserService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.showForm = false;
      this.reason = 'You are not logged in as a coachee or as a coach.';
    } else {
      this.getCoach();
    }
  }

  getCoach(): void {
    const coachId = this.route.snapshot.paramMap.get('id');
    if (!coachId) {
      this.showForm = false;
      this.reason = 'Coach id not provided in the path.';
      return;
    }
    this.userService.getCoach(coachId).subscribe({
      next: (user: User) => {
        if (user.userId === this.userService.getUserId()) {
          this.showForm = false;
          this.reason = 'You cannot request a coaching session with yourself.';
        } else if (user.coachInformation.coachingTopics.length <= 0) {
          this.showForm = false;
          this.reason = 'Coach does not have any topics to offer.';
        } else {
          this.coach = user;
          // this.coachingTopics = user.coachInformation.coachingTopics;
        }
      },
      error: (error) => {
        this.showForm = false;
        this.reason = 'Coach cannot be found.';
        console.log(error.error.message);
      }
    });
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      this.formGroup.value.time = moment(this.formGroup.value.date).format("HH:mm");
      this.formGroup.value.date = moment(this.formGroup.value.date).format("YYYY-MM-DD");
      this.formGroup.value.location = {name: this.formGroup.value.location}
      this.formGroup.value.coachId = this.coach?.userId;
      this.formGroup.value.coacheeId = this.userService.getUserId();
      this.sessionService.requestSession(this.formGroup.value).subscribe({
        // next: () => this.router.navigate(['/user/sessions'], {relativeTo: this.route}),
        next: () => this.router.navigate(['account/coachee', {outlets: {view: 'coaching-sessions'}}]).then(),
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
}
