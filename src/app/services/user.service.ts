import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  public tokenName = 'code_coach_token';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.urlUsers + '/' + id);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUsers, user);
  }

  updateUser(user: User, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.put<User>(this.urlUsers + '/' + id, user, { headers: headers });
  }

  loginUser(user: User): Observable<any> {
    return this.http.post(this.urlLogin, user, {observe: "response"});
  }

  logoutUser() {
    sessionStorage.removeItem(this.tokenName);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenName);
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
