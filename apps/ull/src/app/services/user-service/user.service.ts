import { Injectable } from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {HttpClient} from "@angular/common/http";

import {
  ProviderProfile
} from "@ull/api-interfaces";
import {environment} from "../../../environments/environment";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) { }

  /**
   * Returns the full profile of the connected user.
   *
   * Employs a caching strategy : on the first fetch, the profile is stored to sessionStorage, and this
   * value is reused for subsequent calls. Use the #force parameter to invalidate the cache.
   * @param force invalidates the cache and forces a reload from the server
   */
  fetchProviderProfile(force : boolean = false) : Observable<ProviderProfile> {
    return of({
      id_provider: "5f51f2b9-55d4-4b92-8288-49a3dfbec9cb",
      company_name: "Catering premium",
      company_description: "Un service traiteur de qualité",
      area_served: "Région parisienne",
      cover_picture: "",
      profile_picture: "../../../../assets/images/cocktails.jpg",
      rating: 4.5,
    } as ProviderProfile)

    /* Commented out right now to avoid warning from unreachable code
    if (force) {
      sessionStorage.removeItem('profile')
    }

    const cachedProfile = sessionStorage.getItem('profile');
    if (cachedProfile){
      return of(JSON.parse(cachedProfile));
    } else {
      const idProvider = this.authenticationService.getProviderId();
      return this.httpClient.get<ProviderProfile>(environment.baseServerURL + environment.providerServiceURL + '/provider_profile/' + idProvider)
        .pipe(
          tap({
            next: payload => sessionStorage.setItem('profile', JSON.stringify(payload))
          })
        )
    }
    */
  }
}
