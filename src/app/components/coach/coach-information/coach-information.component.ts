import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../../model/User";

@Component({
  selector: 'app-coach-information',
  templateUrl: './coach-information.component.html',
  styleUrls: ['./coach-information.component.scss']
})
export class CoachInformationComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() editable: boolean = true;
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
