import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";

@Component({
  selector: 'app-coach-topics',
  templateUrl: './coach-topics.component.html',
  styleUrls: ['./coach-topics.component.scss']
})
export class CoachTopicsComponent implements OnInit {

  @Input() user: User | undefined;
  @Output() userIsUpdated = new EventEmitter<any>();
  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  formWasSubmitted() {
    this.editMode = false;
    this.userIsUpdated.emit();
  }

}
