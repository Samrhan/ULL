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
    title: "ULL et ses partenaires sont là pour vous y aider !",
    text: "Que ce soit votre anniversaire, votre mariage ou tout autre idée géniale que vous avez eu, ULL a ce qu’il vous faut !"
  },
  {
    category: "Touchez une nouvelle clientèle",
    title: "Envi de changer d’air et de visage ? Faire kiffer toujours plus de monde ? Alors rejoins-nous !",
    text: "ULL te permet de te mettre en avant comme jamais avant, sans avoir besoin de changer qui tu es ! Fais vite découvrir tes talents au monde ! "
  },
  {
    category: "Simplifiez la gestion de votre activité",
    title: "Le papier n'est pas pour toi ? Pas de problème, chez ULL on aime pas ça non plus. ",
    text: "ULL te fait tes factures, tes contrats, et tout ce qui y ressemble pour que tu puisses te concentrer sur ce qui compte, ta passion !"
  }]
  selected = 0;
}
