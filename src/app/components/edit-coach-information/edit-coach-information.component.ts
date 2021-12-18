import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../model/User";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-edit-coach-information',
  templateUrl: './edit-coach-information.component.html',
  styleUrls: ['./edit-coach-information.component.scss']
})
export class EditCoachInformationComponent implements OnInit {

  @Input() user: User | undefined;
  @Output() userIsUpdated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    userId: '',
    coachInformation: this.formBuilder.group({
      introduction: '',
      availability: ''
    }),
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.user) this.formGroup.patchValue({
      coachInformation: this.user.coachInformation
    });
  }

  onSubmit(): void {
    this.errorMessages = [];
    this.formGroup.disable();
    if (this.user === undefined) return;
    this.userService.updateCoach(this.formGroup.value, this.user.userId).subscribe({
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
