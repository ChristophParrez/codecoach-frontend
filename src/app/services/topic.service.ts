import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Topic} from "../model/Topic";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topicUrl = `${environment.backendUrl}/topics`;

  constructor(private http: HttpClient) { }

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicUrl);
  }
}
