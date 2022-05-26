import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

import { faBars, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'ull-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AccueilComponent {
  faBars = faBars;
  faArrowRight = faArrowRight;

  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;

  explainPannels = [{
    category: "Organisez des événements inoubliables",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit !",
    text: "Morbi dictum vestibulum dolor at dignissim. Ut congue non ligula vel tempor."
  },
  {
    category: "Touchez une nouvelle clientèle",
    title: "Lorem ipsum dolor sit amet",
    text: "Morbi dictum vestibulum dolor at dignissim. Ut congue non ligula vel tempor."
  },
  {
    category: "Simplifiez la gestion de votre activité",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit !",
    text: "Lorem ipsum dolor sit amet. Morbi dictum vestibulum dolor at dignissim. Ut congue non ligula vel tempor."
  }]
  selected = 0;
}
