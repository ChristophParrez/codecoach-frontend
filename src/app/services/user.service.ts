import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {environment} from "../../environments/environment";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlRegister = `${environment.backendUrl}/users`
  private urlLogin = `${environment.backendUrl}/security/login`

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlRegister, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post(this.urlLogin, user, {observe: "response"});
  }

  getToken():string | null{
    return sessionStorage.getItem("codecoach_token");
  }

  getRole(): string {
    const token = this.getToken();
    if(token == null){
      return "";
    }
    const tokenDecoded: any = jwt_decode(token);
    return tokenDecoded.rol;
  }

  getUserId():string{
    const token = this.getToken();
    if(token == null){
      return "";
    }
    const tokenDecoded: any = jwt_decode(token);
    return tokenDecoded.id;
  }
}
