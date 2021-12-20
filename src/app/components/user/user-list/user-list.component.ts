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
        this.users = users;
        this.sortedUsers = this.users.slice();
      },
      error: (e) => console.log(e)
    });
  }

  onClickUser(event: any, userId: string) {
    if (!event.target.classList.contains('disable-click')) this.router.navigate(['/profile/' + userId]).then();
  }

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
        case 'first-name':
          return this.compare(a.firstName, b.firstName, isAsc);
        case 'last-name':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'company':
          return this.compare(a.companyName, b.companyName, isAsc);
        case 'roles':
          return this.compare(a.roles.map(role => role.role).join(','), b.roles.map(role => role.role).join(','), isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
