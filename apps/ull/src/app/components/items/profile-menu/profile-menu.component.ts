import {Component, Input} from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ull-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {
  @Input() profilePictureUrl = "";
  @Input() companyName = "";
  @Input() companyDescription = "";

  environment = environment;
}
