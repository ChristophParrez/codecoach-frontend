import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Role } from "../model/Role";
import { NavigationEnd, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private history: string[] = [];

  roles: typeof Role = Role;

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  goBack(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  showDefaultImage(event: any): void {
    const element = event.target;
    element.src = './assets/images/image-not-found.svg';
    element.style.background = '#fff';
    element.style.borderRadius = 0;
    element.style.objectFit = 'contain';
    element.classList.add('default-image');
  }
}
