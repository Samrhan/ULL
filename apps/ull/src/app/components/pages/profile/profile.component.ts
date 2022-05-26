import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {ProviderProfile} from "@ull/api-interfaces";

import {faStar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ull-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  faStar = faStar

  constructor(
    private userService: UserService
  ) {}

  profile : ProviderProfile | undefined;

  ngOnInit() {
    this.userService.fetchProviderProfile().subscribe({
      next: value => this.profile = value
    })
  }
}
