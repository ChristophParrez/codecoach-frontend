import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Topic} from "../model/Topic";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topicUrl = `${environment.backendUrl}/topics`;

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicUrl);
  }

  createNewTopic(topic: Topic): Observable<Topic> {
    const headers = new HttpHeaders({
      'Authorization': `${this.userService.getToken()}`
    })
    return this.http.post<Topic>(this.topicUrl, topic, {headers: headers});
  }
}
