import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";
import { Role } from "../../model/Role";
import { AppService } from "../../services/app.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  roles: typeof Role = Role;
  @Input() user: User | undefined;
  @Input() editable: boolean = true;
  @Input() pageRole: Role = Role.COACHEE;
  @Output() userIsUpdated = new EventEmitter<any>();

  editMode: boolean = false;

  constructor(public userService: UserService, public appService: AppService) {
  }

  ngOnInit(): void {
  }

  userChanged(): void {
    this.editMode = !this.editMode;
    this.userIsUpdated.emit();
  }
}
