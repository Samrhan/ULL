import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {ProviderProfile} from "@ull/api-interfaces";

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ull-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  environment = environment;

  constructor(
    private userService: UserService
  ) {}

  view : "accepted" | "requested" = "accepted";

  profile : ProviderProfile | undefined;

  ngOnInit() {
    this.userService.fetchProviderProfile(true).subscribe({
      next: value => this.profile = value
    })
  }
}
