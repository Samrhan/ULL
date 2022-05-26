import {Component, Input} from '@angular/core';

@Component({
  selector: 'ull-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {
  @Input() profilePictureUrl = "";
  @Input() companyName = "";
  @Input() companyDescription = "";
}
