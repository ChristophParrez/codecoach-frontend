import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {TopicService} from "../../services/topic.service";
import {Topic} from "../../model/Topic";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {

  public coaches: User[] = [];
  public topics: Topic[] = [];
  public searchText: string = '';
  topicControl = new FormControl();
  yearControl = new FormControl();
  options: FormGroup;

  constructor(private userService: UserService,
              private topicService: TopicService,
              private formBuilder: FormBuilder) {
    this.options = formBuilder.group({topic: this.topicControl,
      year: this.yearControl});
  }

  ngOnInit(): void {
    this.getAllCoaches();
    this.getAllTopics();
  }

  filterTopic(): void {

  }

  filterYear(): void {

  }

  getAllCoaches(): void {
    this.userService.getAllCoaches()
      .subscribe(coaches => this.coaches = coaches);
  }

  getAllTopics(): void {
    this.topicService.getAllTopics()
      .subscribe(topics => this.topics = topics);
  }

  showDefaultImage(event: any): void {
    event.target.src = './assets/images/image-not-found.png';
  }
}
