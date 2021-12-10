import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openSidenav = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
