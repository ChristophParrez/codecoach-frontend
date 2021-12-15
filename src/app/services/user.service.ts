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
  private urlCoach = `${environment.backendUrl}/coaches`
  private urlLogin = `${environment.backendUrl}/security/login`
  public tokenName = 'code_coach_token';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.urlUsers + '/' + id);
  }

  getCoach(id: string): Observable<User> {
    return this.http.get<User>(this.urlCoach + '/' + id);
  }

  getAllCoaches(): Observable<User[]> {
    return this.http.get<User[]>(this.urlCoach);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlUsers, user);
  }

  updateUser(user: User, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`
    })
    return this.http.put<User>(this.urlUsers + '/' + id, user, { headers: headers });
  }

  becomeCoach(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`
    })
    return this.http.patch(this.urlUsers + '/' + id, '', {headers: headers});
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

  setToken(token: string) {
    sessionStorage.setItem(this.tokenName, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenName);
  }

  getDecodedToken(): any {
    const token: any = this.getToken();
    return typeof token !== 'string' ? null : jwt_decode(token);
  }

  getUserRoles(): string[] {
    return this.getDecodedToken()?.role || [];
  }

  getUserId(): string {
    return this.getDecodedToken().id || '';
  }

  isCoach(): boolean {
    return this.getUserRoles().includes('COACH');
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ADMIN');
  }
}
