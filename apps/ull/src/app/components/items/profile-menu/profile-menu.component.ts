import { Component } from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'ull-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {
  constructor(
    public userService: UserService
  ) {}
}
