import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public _year: Date;

  constructor() {
    this._year = new Date();
  }

  ngOnInit(): void {
  }

}
