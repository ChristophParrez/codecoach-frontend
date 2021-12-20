import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Session } from "../../../model/Session";
import { Role } from "../../../model/Role";
import { SessionTableType } from "../../../model/SessionTableType";
import { Status } from "../../../model/Status";
import { Sort } from "@angular/material/sort";
import { UserService } from "../../../services/user.service";
import { User } from "../../../model/User";
import { AppService } from "../../../services/app.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] | undefined;
  sortedUsers: User[] | undefined;
  userRoles: typeof Role = Role;

  constructor(public userService: UserService, public appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.users = users;
        this.sortedUsers = this.users.slice();
      },
      error: (e) => console.log(e)
    });
  }

  onClickUser(event: any, userId: string) {
    if (!event.target.classList.contains('disable-click')) this.router.navigate(['/profile/' + userId]).then();
  }

  // private setAllowedStatusList(): void {
  //   switch (this.type) {
  //     case this.tableTypes.UPCOMING:
  //       this.statusesToShow = [Status.REQUESTED, Status.ACCEPTED];
  //       break;
  //     case this.tableTypes.WAITING_FOR_FEEDBACK:
  //       this.statusesToShow = [Status.DONE_WAITING_FOR_FEEDBACK];
  //       break;
  //     case this.tableTypes.ARCHIVE:
  //       this.statusesToShow = [Status.DECLINED, Status.FINISHED_FEEDBACK_GIVEN, Status.FINISHED_AUTOMATICALLY_CLOSED, Status.FINISHED_CANCELLED_BY_COACHEE, Status.FINISHED_CANCELLED_BY_COACH];
  //       break;
  //   }
  // }

  sortData(sort: Sort) {
    if (!this.sortedUsers) return;
    const data = this.sortedUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }

    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        // case 'coach':
        //   return this.compare(a.coach.firstName, b.coach.firstName, isAsc);
        // case 'subject':
        //   return this.compare(a.subject, b.subject, isAsc);
        // case 'date':
        //   return this.compare(a.date.getTime(), b.date.getTime(), isAsc);
        // case 'time':
        //   return this.compare(a.time, b.time, isAsc);
        // case 'location':
        //   return this.compare(a.location.name, b.location.name, isAsc);
        // case 'status':
        //   return this.compare(a.status.statusName, b.status.statusName, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
