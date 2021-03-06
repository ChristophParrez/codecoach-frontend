import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Session} from "../../../model/Session";
import {Role} from "../../../model/Role";
import {Sort} from '@angular/material/sort';
import {SessionTableType} from "../../../model/SessionTableType";
import {Status} from "../../../model/Status";
import {Router} from "@angular/router";
import {SessionService} from "../../../services/session.service";
import {User} from "../../../model/User";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sessions-table',
  templateUrl: './sessions-table.component.html',
  styleUrls: ['./sessions-table.component.scss']
})
export class SessionsTableComponent implements OnInit, OnChanges {

  @Input() sessions: Session[] | undefined;
  @Input() coacheeId: string | undefined;
  @Input() coachId: string | undefined;
  @Input() pageRole: Role | undefined;
  @Input() title: string | undefined;
  @Input() type: SessionTableType | undefined;

  @Output() sessionChanged = new EventEmitter<any>();

  userRoles: typeof Role = Role;
  tableTypes: typeof SessionTableType = SessionTableType;
  status: typeof Status = Status;
  sortedSessions: Session[] | undefined;
  statusesToShow: Status[] = [];
  currentUser : User | undefined

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private router: Router) {
  }

  onClickUser(event: any, userId: string) {
    if (!event.target.classList.contains('disable-click')) this.router.navigate(['/profile/' + userId]).then();
  }

  ngOnInit(): void {
    this.setTitle();
    this.setAllowedStatusList();
    this.userService.getUser(this.userService.getUserId()).subscribe(user => this.currentUser = user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.sessions) return;
    const allowedStatusValues = this.statusesToShow.map(status => status.toString());
    this.sortedSessions = this.sessions.slice().filter(session => allowedStatusValues.includes(session.status.statusName));
  }

  changeStatus(sessionId: string, status: Status) {
    this.sessionService.changeStatus(sessionId, status).subscribe(() => this.sessionChanged.emit());
  }

  private setTitle(): void {
    switch (this.type) {
      case this.tableTypes.UPCOMING:
        this.title = 'My upcoming sessions';
        break;
      case this.tableTypes.WAITING_FOR_FEEDBACK:
        this.title = 'Waiting for feedback';
        break;
      case this.tableTypes.ARCHIVE:
        this.title = 'Archive';
        break;
      case this.tableTypes.OVERVIEW:
        this.title = 'Overview of sessions';
        break;
    }
  }

  private setAllowedStatusList(): void {
    switch (this.type) {
      case this.tableTypes.UPCOMING:
        this.statusesToShow = [Status.REQUESTED, Status.ACCEPTED];
        break;
      case this.tableTypes.WAITING_FOR_FEEDBACK:
        this.statusesToShow = [Status.DONE_WAITING_FOR_FEEDBACK];
        break;
      case this.tableTypes.ARCHIVE:
        this.statusesToShow = [Status.DECLINED, Status.FINISHED_FEEDBACK_GIVEN, Status.FINISHED_AUTOMATICALLY_CLOSED, Status.FINISHED_CANCELLED_BY_COACHEE, Status.FINISHED_CANCELLED_BY_COACH];
        break;
      case this.tableTypes.OVERVIEW:
        this.statusesToShow = [Status.REQUESTED, Status.ACCEPTED, Status.DONE_WAITING_FOR_FEEDBACK,
                                Status.DECLINED, Status.FINISHED_AUTOMATICALLY_CLOSED, Status.FINISHED_CANCELLED_BY_COACH,
                                Status.FINISHED_CANCELLED_BY_COACHEE, Status.FINISHED_FEEDBACK_GIVEN];
        break;
    }
  }

  sortData(sort: Sort) {
    if (!this.sortedSessions) return;
    const data = this.sortedSessions.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedSessions = data;
      return;
    }

    this.sortedSessions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'coach':
          return this.compare(a.coach.firstName, b.coach.firstName, isAsc);
        case 'coachee':
          return this.compare(a.coachee.firstName, b.coachee.firstName, isAsc);
        case 'subject':
          return this.compare(a.subject, b.subject, isAsc);
        case 'date':
          return this.compare(a.date.getTime(), b.date.getTime(), isAsc);
        case 'time':
          return this.compare(a.time, b.time, isAsc);
        case 'location':
          return this.compare(a.location.name, b.location.name, isAsc);
        case 'status':
          return this.compare(a.status.statusName, b.status.statusName, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}
