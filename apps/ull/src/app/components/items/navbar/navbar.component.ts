import {Component, Input} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";

import {faCalendar, faDollar, faMessage} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ull-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  @Input() selected = ""

  faCalendar = faCalendar;
  faDollar = faDollar;
  faMessage = faMessage;

  console = console;

  constructor(
    public userService: UserService
  ) {}
}
