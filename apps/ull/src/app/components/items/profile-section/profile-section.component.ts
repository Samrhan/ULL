import {Component, Input} from '@angular/core';
import {Performance, ProviderProfileSection, SectionType} from "@ull/api-interfaces";
import { environment } from '../../../../environments/environment';
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'ull-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss'],
})
export class ProfileSectionComponent{
  @Input() section: ProviderProfileSection = {
    content: [],
    id_section: "",
    pictures: [],
    preview_amount: 0,
    purchasable: false,
    section_description: "",
    section_title: "",
    type: SectionType.INFO
  };
  providerId = "";

  environment = environment;

  showAll = false; // Used to extend the small section when clicking the "voir plus" button

  SectionType = SectionType;

  constructor(
    private authService: AuthenticationService
  ) {
    this.providerId = this.authService.getProviderId();
  }

  /**
   * Converts the given price into decimal form and adds the quantifier at the end
   * @param price If "unit" is person, adds "/ Participant". If "unit" is "stack", adds "/ Unité". If "unit" is "absolute", adds nothing.
   */
  formatPrice(price: { value: number, unit: "absolute" | "person" | "stack" }) : string {
    switch (price.unit){
      case "person":
        return `${price.value / 100}€ / Participant`;
      case "stack":
        return `${price.value / 100}€ / Unité`;
      case "absolute":
      default:
        return `${price.value / 100}€`;
    }
  }

  /**
   * Allows the small section to filter the number of performances it should show
   * @param original
   * @param maxDisplay
   */
  getShortDisplayList(original: Performance[], maxDisplay: number | undefined) : Performance[] {
    if (maxDisplay && !this.showAll) {
      return original.filter((_, index) => index < maxDisplay);
    }
    return original;
  }
}
