import {Component, Input} from '@angular/core';

import {faCalendar, faDollar, faMessage} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ull-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  @Input() selected = "";
  @Input() profilePictureUrl = "";
  @Input() companyName = "";
  @Input() companyDescription = "";

  faCalendar = faCalendar;
  faDollar = faDollar;
  faMessage = faMessage;

  console = console;
}
