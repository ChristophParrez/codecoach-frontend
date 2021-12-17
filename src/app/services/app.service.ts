import { Injectable } from '@angular/core';
import { User } from "../model/User";
import { Role } from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  roles: typeof Role = Role;

  constructor() { }

  showDefaultImage(event: any): void {
    const element = event.target;
    element.src = './assets/images/image-not-found.svg';
    element.style.background = '#fff';
    element.style.borderRadius = 0;
    element.style.objectFit = 'contain';
    element.classList.add('default-image');
  }

  isCoach(user: User) {
    return user.roles.map(role => role.role).includes(this.roles.COACH)
  }
}
