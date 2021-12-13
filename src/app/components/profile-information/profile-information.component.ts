import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  @Input() user: User | undefined;
  @Output() userIsUpdated = new EventEmitter<any>();

  editMode: boolean = false;

  constructor() {
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
