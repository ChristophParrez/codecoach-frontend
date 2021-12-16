import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input() max: number = 5;
  @Input() value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
