import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {

  public name: string = "Coach";
  public topic1: string = "HTML";
  public topic2: string = "Java";
  public amount: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  getAllCoaches(): void {
    return this.userService.getAllCoaches();
  }

  showDefaultImage(event: any): void {
    event.target.src = './assets/images/image-not-found.png';
  }
}
