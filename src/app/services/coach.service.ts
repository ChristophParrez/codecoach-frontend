import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CoachingTopic} from "../model/CoachingTopic";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private coachUrl = `${environment.backendUrl}/coaches`;

  constructor(private userService: UserService,
              private http: HttpClient) { }

  updateCoachingTopics(coachingTopics: Array<CoachingTopic>, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    return this.http.put<Array<CoachingTopic>>(`${this.coachUrl} /${userId}/topics`, coachingTopics, { headers: headers });
  }
}
