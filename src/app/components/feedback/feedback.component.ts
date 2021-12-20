import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {SessionService} from "../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  errorMessages: string[] = [];
  sessionId: string | any;
  role: string | any;

  formGroup: FormGroup = this.formBuilder.group({
    score1: ['', Validators.required],
    score2: ['', Validators.required],
    comment: [''],
  });

  isFeedbackAlreadyGiven: any;

  constructor( private formBuilder: FormBuilder,
               public appService: AppService,
               private sessionService: SessionService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.role = this.route.snapshot.paramMap.get('role');
  }

  onSubmit() : void{
    this.errorMessages = [];
    if(this.formGroup.invalid){
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      this.sessionService.giveFeedback(this.formGroup.value, this.sessionId).subscribe({
        next:() => this.router.navigate([`/account/${this.role.toLowerCase()}`, { outlets: { view: 'coaching-sessions'}}]).then(),
        error:(response) => {
          if (response) {
            this.errorMessages.push(response.error.message)
            if(response.error.message.includes("provided")){
              this.isFeedbackAlreadyGiven = true;
            }
          }
        }
      })
    }
  }
}
