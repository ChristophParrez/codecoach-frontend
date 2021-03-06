import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/User";
import {TopicService} from "../../../services/topic.service";
import {Topic} from "../../../model/Topic";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {

  public coaches: User[] | undefined;
  public topics: Topic[] = [];
  public searchText: string = '';
  public topicControl = new FormControl();
  public options: FormGroup = this.formBuilder.group({topic: this.topicControl});

  constructor(private userService: UserService,
              private topicService: TopicService,
              private formBuilder: FormBuilder,
              public appService: AppService) {
  }

  ngOnInit(): void {
    this.getAllCoaches();
    this.getAllTopics();
  }

  getAllCoaches(): void {
    this.userService.getAllCoaches().subscribe(coaches => this.coaches = coaches
      .sort((coach1, coach2) => coach2.coachInformation.coachingTopics.length - coach1.coachInformation.coachingTopics.length));
  }

  getAllTopics(): void {
    this.topicService.getAllTopics().subscribe(topics => this.topics = topics);
  }
}
