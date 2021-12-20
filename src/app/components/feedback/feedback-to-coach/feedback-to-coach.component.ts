import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-feedback-to-coach',
  templateUrl: './feedback-to-coach.component.html',
  styleUrls: ['./feedback-to-coach.component.scss']
})
export class FeedbackToCoachComponent implements OnInit {

  errorMessages: string[] = [];
  sessionId: string | any;

  formGroup: FormGroup = this.formBuilder.group({
    score1: ['', Validators.required],
    score2: ['', Validators.required],
    comment: [''],
  });

  isFeedbackAlreadyGiven: any;

  constructor( private formBuilder: FormBuilder,
               private appService: AppService,
               private sessionService: SessionService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
  }

  onSubmit() : void{
    this.errorMessages = [];
    console.log(this.formGroup.value)
    if(this.formGroup.invalid){
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      this.sessionService.giveFeedback(this.formGroup.value, this.sessionId).subscribe({
        next:()=>{},
        error:(response) => {
          if (response) {
            this.errorMessages.push(response.error.message)
            console.log(typeof response.error.message);
            if(response.error.message.includes("provided")){
              this.isFeedbackAlreadyGiven = true;
            }
          }
        }
      })
    }
  }
}
