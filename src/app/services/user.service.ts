import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/User";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.backendUrl}/users`

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<User> {
    console.log('user service called');
    return this.http.post<User>(this.url, user);
  }
}
