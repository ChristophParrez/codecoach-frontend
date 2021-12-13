import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openSidenav = new EventEmitter<any>();
  gitHubIcon = faGithub;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

}
