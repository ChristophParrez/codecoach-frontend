import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { User } from "../model/User";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Session } from "../model/Session";
import { UserService } from "./user.service";
import { Role } from "../model/Role";
import * as moment from 'moment';
import {Feedback} from "../model/Feedback";
import {Topic} from "../model/Topic";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private urlSession = `${environment.backendUrl}/sessions`

  constructor(private http: HttpClient, private userService: UserService) {
  }

  requestSession(session: Session): Observable<Session> {
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    return this.http.post<Session>(this.urlSession, session, {headers: headers});
  }

  getSessions(role: Role): Observable<Session[]> {
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    const params = new HttpParams().set('role', role);
    return this.http.get<Session[]>(this.urlSession, {headers: headers, params: params})
      .pipe(
        map(source => {
            source.map(session => {
              session.date = moment(session.date).toDate()
              this.userService.getUser(session.coacheeId).subscribe(user => session.coachee = user);
              this.userService.getCoach(session.coachId).subscribe(user => session.coach = user);
            });
            return source;
          }
        )
      );
  }

  giveFeedback(feedback:Feedback, sessionId: string): Observable<Feedback>{
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    console.log("token: " + this.userService.getToken());
    console.log("feedback in session service: " + feedback)
    return this.http.post<Feedback>(`${this.urlSession}/${sessionId}/feedback`, feedback, {headers: headers});
  }


  mapCoaches(sessions: Session[]): void {
    this.userService.getAllCoaches().subscribe({
      next: (coaches) => {
        sessions.map(session => session.coach = coaches.filter((coach) => coach.userId === session.coachId)[0]);
        // this.sessions = sessions;
      },
      error: (e) => console.log(e)
    });
  }
}
