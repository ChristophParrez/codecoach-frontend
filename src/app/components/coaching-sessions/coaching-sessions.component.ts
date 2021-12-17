import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Session } from "../../model/Session";
import { Role } from "../../model/Role";
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-coaching-sessions',
  templateUrl: './coaching-sessions.component.html',
  styleUrls: ['./coaching-sessions.component.scss']
})
export class CoachingSessionsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() sessions: Session[] = [];
  @Input() coacheeId: string | undefined;
  @Input() coachId: string | undefined;
  @Input() pageRole: Role | undefined;
  @Input() title: string | undefined;

  roles: typeof Role = Role;
  sortedData: Session[] | null = null;

  constructor() {

  }

  ngAfterViewInit(): void {
    console.log('sessions after view init', this.sessions)
    this.sortedData = this.sessions.slice();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('sessions after changes', this.sessions)
    if (this.sortedData == null && this.sessions.length > 0) this.sortedData = this.sessions.slice();
    this.sortedData = this.sessions.slice();
    console.log('sorted data', this.sortedData)
  }

  sortData(sort: Sort) {
    const data = this.sessions.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'coach':
          return compare(a.coach.firstName, b.coach.firstName, isAsc);
        case 'subject':
          return compare(a.subject, b.subject, isAsc);
        case 'date':
          return compare(a.date.getTime(), b.date.getTime(), isAsc);
        case 'time':
          return compare(a.time, b.time, isAsc);
        case 'location':
          return compare(a.location.name, b.location.name, isAsc);
        case 'status':
          return compare(a.status.statusName, b.status.statusName, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
