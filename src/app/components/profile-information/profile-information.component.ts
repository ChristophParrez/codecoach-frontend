import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";
import { Role } from "../../model/Role";
import { AppService } from "../../services/app.service";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() editable: boolean = true;
  @Input() pageRole: Role = Role.COACHEE;
  @Output() userIsUpdated = new EventEmitter<any>();

  editMode: boolean = false;

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
  }

  userChanged(): void {
    this.editMode = !this.editMode;
    this.userIsUpdated.emit();
  }
}
