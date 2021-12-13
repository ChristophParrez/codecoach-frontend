import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openSidenav = new EventEmitter<any>();
  gitHubIcon = faGithub;

  constructor() {
  }

  ngOnInit(): void {
  }

}
