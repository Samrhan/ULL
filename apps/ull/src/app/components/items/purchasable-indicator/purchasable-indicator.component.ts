import {Component, Input} from '@angular/core';

import {faDollarSign, faBan} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ull-purchasable-indicator',
  templateUrl: './purchasable-indicator.component.html',
  styleUrls: ['./purchasable-indicator.component.scss'],
})
export class PurchasableIndicatorComponent {
  constructor() {}

  @Input() purchasable = true;

  faBan = faBan;
  faDollarSign = faDollarSign;
}
