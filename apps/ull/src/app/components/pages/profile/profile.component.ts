import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {ProviderProfile} from "@ull/api-interfaces";

@Component({
  selector: 'ull-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
