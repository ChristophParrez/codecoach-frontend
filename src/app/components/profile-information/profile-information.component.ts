import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";
import { Role } from "../../model/Role";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  @Input() user: User | undefined;
  @Input() pageRole: Role = Role.COACHEE;
  @Output() userIsUpdated = new EventEmitter<any>();

  editMode: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  userChanged(): void {
    this.editMode = !this.editMode;
    this.userIsUpdated.emit();
  }

  showDefaultImage(event: any): void {
    event.target.src = './assets/images/image-not-found.png';
  }
}
