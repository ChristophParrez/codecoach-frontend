import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/User";
import { environment } from "../../environments/environment";
import jwt_decode from "jwt-decode";
import { Role } from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userRoles: typeof Role = Role;
  private urlUsers = `${environment.backendUrl}/users`
  private urlCoach = `${environment.backendUrl}/coaches`
  private urlLogin = `${environment.backendUrl}/security/login`
  private tokenName = 'code_coach_token';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`
    })
    return this.http.get<User>(this.urlUsers + '/' + id, { headers: headers });
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

  updateCoach(user: User, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`
    })
    return this.http.put<User>(this.urlCoach + '/' + id, user, { headers: headers });
  }

  becomeCoach(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`
    })
    return this.http.patch(this.urlUsers + '/' + id, '', {headers: headers, observe: "response"});
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
    return this.getDecodedToken()?.id || '';
  }

  isCoach(user?: User): boolean {
    if (user == null) return this.getUserRoles().includes(this.userRoles.COACH);
    return user.roles.map(role => role.role).includes(this.userRoles.COACH)
  }

  isAdmin(): boolean {
    return this.getUserRoles().includes('ADMIN');
  }
}
