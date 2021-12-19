import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Session } from "../../../model/Session";
import { Role } from "../../../model/Role";
import { Sort } from '@angular/material/sort';
import { SessionTableType } from "../../../model/SessionTableType";
import { Status } from "../../../model/Status";

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

  userRoles: typeof Role = Role;
  tableTypes: typeof SessionTableType = SessionTableType;
  sortedSessions: Session[] | undefined;
  statusesToShow: Status[] = [];
  filterMetadata: any = {count: 0};

  constructor() {
  }

  ngOnInit(): void {
    this.setTitle();
    this.setAllowedStatusList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.sessions) return;
    const allowedStatusValues = this.statusesToShow.map(status => status.toString().split('_').join(' '));
    this.sortedSessions = this.sessions.slice().filter(session => allowedStatusValues.includes(session.status.statusName));
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
