import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent, AlertDialogData} from "../dialogs/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openSidenav = new EventEmitter<any>();
  gitHubIcon = faGithub;

  constructor(public userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.userService.getUserName();
    }
  }

  holidays() {
    const dialogData: AlertDialogData = {title: "Merry X-mas & Happy New Year", message: 'The Codecoach team wishes you a Merry Christmas and a Happy New Year'};
    this.dialog.open(AlertDialogComponent, {
      maxWidth: "600px",
      data: dialogData,
      autoFocus: false
    });
  }

}
