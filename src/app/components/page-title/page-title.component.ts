import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/User";

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() showEditButton: boolean = false;
  @Output() editButtonClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
