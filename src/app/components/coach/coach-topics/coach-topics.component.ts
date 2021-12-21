import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/User";
import {CoachingTopic} from "../../../model/CoachingTopic";
import {TopicService} from "../../../services/topic.service";
import {Topic} from "../../../model/Topic";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {CoachService} from "../../../services/coach.service";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-coach-topics',
  templateUrl: './coach-topics.component.html',
  styleUrls: ['./coach-topics.component.scss']
})
export class CoachTopicsComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() editable: boolean = true;
  @Output() userIsUpdated = new EventEmitter<any>();

  editMode: boolean = false;
  topics: Topic[] | undefined;
  errorMessages: string[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    topic1: ['', RxwebValidators.different({fieldName:'topic2'})],
    experience1: ['1'],
    topic2: ['', RxwebValidators.different({fieldName:'topic1'})],
    experience2: ['1'],
  });

  constructor(private topicService: TopicService,
              private appService: AppService,
              private coachService: CoachService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe(topics => this.topics = topics);
    if(this.user && this.user.coachInformation.coachingTopics.length >= 1){
      this.formGroup.patchValue({
        topic1: this.user.coachInformation.coachingTopics[0].topic.name,
        experience1: this.user.coachInformation.coachingTopics[0].experience
      })
    }
    if(this.user && this.user.coachInformation.coachingTopics.length === 2){
      this.formGroup.patchValue({
        topic2: this.user.coachInformation.coachingTopics[1].topic.name,
        experience2: this.user.coachInformation.coachingTopics[1].experience
      })
    }
  }

  formWasSubmitted() {
    this.editMode = false;
    this.userIsUpdated.emit();
    this.formGroup.enable();
  }

  onSubmit(): void {
    this.errorMessages = [];
    if (this.formGroup.invalid) {
      this.appService.triggerValidationOnFields(this.formGroup);
    } else {
      this.formGroup.disable();
      if (this.user === undefined) return;

      const coachingTopics = [];

      if(this.formGroup.value.topic1 !== ""){
        coachingTopics.push({
          coachingTopicId: "",
          topic: {topicId: this.formGroup.value.topic1, name: this.formGroup.value.topic1},
          experience: this.formGroup.value.experience1
        })
      }

      if(this.formGroup.value.topic2 !== ""){
        coachingTopics.push({
          coachingTopicId: "",
          topic: {topicId: this.formGroup.value.topic2, name: this.formGroup.value.topic2},
          experience: this.formGroup.value.experience2
        })
      }

      this.coachService.updateCoachingTopics(coachingTopics, this.user.userId).subscribe({
        next: () => this.formWasSubmitted(),
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
}
