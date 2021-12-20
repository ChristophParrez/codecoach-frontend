import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-feedback-to-coach',
  templateUrl: './feedback-to-coach.component.html',
  styleUrls: ['./feedback-to-coach.component.scss']
})
export class FeedbackToCoachComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    explanation: ['', Validators.required],
    usefulness: ['', Validators.required],
    comments: [''],
  });

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
