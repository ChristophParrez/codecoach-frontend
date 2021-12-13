import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../model/User";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  @Input() user: User | undefined;
  editMode: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

}
