import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Role } from "../model/Role";
import { NavigationEnd, Router } from "@angular/router";
import { FormArray, FormGroup } from "@angular/forms";

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
      this.router.navigateByUrl('/').then()
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

  triggerValidationOnFields(formGroup ?: FormGroup | FormArray): void {
    if (formGroup == null) return;
    Object.keys(formGroup.controls).forEach(field => {
      // @ts-ignore
      const control = formGroup.controls[field];
      if (control instanceof FormGroup || control instanceof FormArray) this.triggerValidationOnFields(control);
      else control.markAsTouched({onlySelf: true});
    });
  }
}
