import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Session} from "../model/Session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private urlSession = `${environment.backendUrl}/sessions`
  public tokenName = 'code_coach_token';

  constructor(private http: HttpClient) { }

  requestSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.urlSession, session);
  }
}
