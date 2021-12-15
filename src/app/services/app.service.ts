import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  showDefaultImage(event: any): void {
    const element = event.target;
    element.src = './assets/images/image-not-found.svg';
    element.style.background = '#fff';
    element.style.borderRadius = 0;
    element.style.objectFit = 'contain';
    element.classList.add('default-image');
  }
}
