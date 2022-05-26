import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  profilePictureURL() : string {
    return "../../../../assets/images/cocktails.jpg";
  }

  companyName() : string {
    return "Catering premium";
  }

  companyDescription() : string {
    return "Service traiteur de qualité \nLorem ipsum dolor sit amet, consectetur adipiscing elit";
  }
}
