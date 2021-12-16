import { Component, OnInit } from '@angular/core';
import {TopicService} from "../../services/topic.service";
import {Topic} from "../../model/Topic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public topics: Topic[] = [];

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.getAllTopics();
  }

  getAllTopics(): void {
    this.topicService.getAllTopics()
      .subscribe(topics => this.topics = topics);
  }
}
