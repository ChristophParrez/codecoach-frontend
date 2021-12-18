import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";
import {CoachingTopic} from "../../model/CoachingTopic";
import {TopicService} from "../../services/topic.service";
import {Topic} from "../../model/Topic";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

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

  formGroup: FormGroup = this.formBuilder.group({
    topic1: ['', Validators.required],
    experience1: ['', Validators.required],
    topic2: ['', Validators.required],
    experience2: ['', Validators.required],
  });

  constructor(private topicService: TopicService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.topicService.getAllTopics().subscribe(topics => this.topics = topics);
  }

  formWasSubmitted() {
    this.editMode = false;
    this.userIsUpdated.emit();
  }

  onSubmit(): void {

  }

}
