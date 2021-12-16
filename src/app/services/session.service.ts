import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../model/User";
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Session} from "../model/Session";
import {UserService} from "./user.service";
import { Role } from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private urlSession = `${environment.backendUrl}/sessions`

  constructor(private http: HttpClient, private userService: UserService) { }

  requestSession(session: Session): Observable<Session> {
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    return this.http.post<Session>(this.urlSession, session, { headers: headers });
  }

  getSessions(role: Role): Observable<Session[]> {
    console.log('role!!!!', role);
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    const params = new HttpParams().set('role', role);
    return this.http.get<Session[]>(this.urlSession,{ headers: headers, params: params });
  }
}
