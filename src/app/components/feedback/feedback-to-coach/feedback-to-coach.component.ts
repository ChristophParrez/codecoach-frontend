import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-feedback-to-coach',
  templateUrl: './feedback-to-coach.component.html',
  styleUrls: ['./feedback-to-coach.component.scss']
})
export class FeedbackToCoachComponent implements OnInit {

  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    score1: ['', Validators.required],
    score2: ['', Validators.required],
    comment: [''],
  });

  constructor( private formBuilder: FormBuilder,
               private appService: AppService,
               private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  onSubmit() : void{
    this.errorMessages = [];
    console.log(this.formGroup.value)
    if(this.formGroup.invalid){
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      this.sessionService.giveFeedback(this.formGroup.value, "de151d3c-9c76-4c22-8869-2cedc3802625").subscribe({
        next:()=>{},
        error:(response) => {
          if (response) {
            this.errorMessages.push('You are not authorized to use this function')
          }
        }
      })
    }
  }
}
