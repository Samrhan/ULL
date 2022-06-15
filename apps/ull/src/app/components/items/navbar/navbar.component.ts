import {Component, Input} from '@angular/core';
import { environment } from '../../../../environments/environment';

import {faCalendar, faDollar, faMessage} from "@fortawesome/free-solid-svg-icons";
import {ProviderProfile} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'ull-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  @Input() selected = "";
  profile: ProviderProfile | undefined;

  faCalendar = faCalendar;
  faDollar = faDollar;
  faMessage = faMessage;

  environment = environment;

  constructor(
    private userService: UserService
  ) {
    this.userService.fetchProviderProfile().subscribe({
      next: value => this.profile = value,
      error: () => alert("Erreur durant la récupération du profil.")
    });
  }
}
