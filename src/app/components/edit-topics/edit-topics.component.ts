import {Component, OnInit} from '@angular/core';
import {TopicService} from "../../services/topic.service";
import {Topic} from "../../model/Topic";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-topics',
  templateUrl: './edit-topics.component.html',
  styleUrls: ['./edit-topics.component.scss']
})
export class EditTopicsComponent implements OnInit {

  public topics: Topic[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    name: ''
  })

  constructor(private topicService: TopicService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllTopics();
  }

  getAllTopics(): void {
    this.topicService.getAllTopics()
      .subscribe(topics => this.topics = topics);
  }

  onSubmit(): void {
    this.topicService.createNewTopic(this.formGroup.value)
      .subscribe(() => {
        console.log(this.formGroup.value);
        this.getAllTopics();
      });
  }

}
