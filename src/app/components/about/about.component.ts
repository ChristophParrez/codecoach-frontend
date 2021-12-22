import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  latestUpdate: any;

  constructor() { }

  ngOnInit(): void {
    // this.latestUpdate = moment(new Date()).format('DD/MM/YYYY')
    this.latestUpdate = '22/12/2021'
  }

}
