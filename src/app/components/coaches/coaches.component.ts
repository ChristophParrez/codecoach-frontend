import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {

  public coaches: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllCoaches();
  }

  getAllCoaches(): void {
    this.userService.getAllCoaches()
      .subscribe(coaches => this.coaches = coaches);
  }

  showDefaultImage(event: any): void {
    event.target.src = './assets/images/image-not-found.png';
  }
}
