import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/User";
import { environment } from "../../environments/environment";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUsers = `${environment.backendUrl}/users`
  private urlLogin = `${environment.backendUrl}/security/login`

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.urlUsers + '/' + id);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUsers, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post(this.urlLogin, user, {observe: "response"});
  }

  getToken(): string | null {
    return sessionStorage.getItem("code_coach_token");
  }

  getDecodedToken(): any {
    const token: any = this.getToken();
    return typeof token !== 'string' ? null : jwt_decode(token);
  }

  getUserRoles(): string[] {
    return this.getDecodedToken().role || [];
  }

  getUserId(): string {
    return this.getDecodedToken().id || '';
  }
}
