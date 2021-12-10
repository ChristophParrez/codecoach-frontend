import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [
        style({height: 0, marginTop: 0, marginBottom: 0}),
        animate(500)
      ]),
      transition(':leave', [
        animate(0),
        style({height: 0})
      ]),
    ])
  ],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() messages: string[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

}
