import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ull-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent {
  environment = environment;

  view : "accepted" | "requested" = "accepted";
}
