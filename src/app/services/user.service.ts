import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/User";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlRegister = `${environment.backendUrl}/users`
  private urlLogin = `${environment.backendUrl}/users/security/login`

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlRegister, user);
  }

  loginUser(user: User):Observable<User>{
    return this.http.post<User>(this.urlLogin, user)

  }
}
