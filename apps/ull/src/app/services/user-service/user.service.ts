import {Injectable} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {HttpClient} from "@angular/common/http";

import {
  CreatePerformanceBody,
  EditProviderInfoBody,
  Performance,
  ProviderCompanyInformation,
  ProviderProfile,
  ProviderProfileSection,
  ReorderProviderProfileBody,
  SectionType, UpdatePerformanceBody,
  UpdateSectionBody, UploadSectionBody
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

  invalidateCache(){
    sessionStorage.clear();
  }

  /**
   * Returns the full profile of the connected user.
   *
   * Employs a caching strategy : on the first fetch, the profile is stored to sessionStorage, and this
   * value is reused for subsequent calls. Use the #force parameter to invalidate the cache.
   * @param force invalidates the cache and forces a reload from the server
   */
  fetchProviderProfile(force : boolean = false) : Observable<ProviderProfile> {
    if (force) {
      sessionStorage.removeItem('profile')
    }

    const cachedProfile = sessionStorage.getItem('profile');
    if (cachedProfile){
      return of(JSON.parse(cachedProfile));
    } else {
      const idProvider = this.authenticationService.getProviderId();
      return this.httpClient.get<ProviderProfile>(environment.baseServerURL + environment.providerServiceURL + '/profile/' + idProvider)
        .pipe(
          tap({
            next: payload => sessionStorage.setItem('profile', JSON.stringify(payload))
          })
        )
    }
  }

  /**
   * Returns the private information of the connected user
   *
   * Employs a caching strategy : on the first fetch, the info is stored to sessionStorage, and this
   * value is reused for subsequent calls. Use the #force parameter to invalidate the cache.
   * @param force invalidates the cache and forces a reload from the server
   */
  fetchProviderCompanyInfo(force : boolean = false) : Observable<ProviderCompanyInformation> {
    if (force) {
      sessionStorage.removeItem('company-info')
    }

    const cachedInfo = sessionStorage.getItem('company-info');
    if (cachedInfo){
      return of(JSON.parse(cachedInfo));
    } else {
      return this.httpClient.get<ProviderCompanyInformation>(environment.baseServerURL + environment.providerServiceURL + '/info')
        .pipe(
          tap({
            next: payload => sessionStorage.setItem('company-info', JSON.stringify(payload))
          })
        )
    }
  }

  /**
   * Updates the company information of the connected user
   * @param newInfo
   */
  editProfileInfo(newInfo : EditProviderInfoBody) : Observable<any> {
    const formData = new FormData();
    formData.append('company_name', newInfo.company_name);
    formData.append('company_description', newInfo.company_description);
    formData.append('email', newInfo.email);
    formData.append('phone', newInfo.phone);
    formData.append('area_served', newInfo.area_served);
    formData.append('address_number', newInfo.address.number);
    formData.append('address_street', newInfo.address.street);
    formData.append('address_city', newInfo.address.city);
    formData.append('address_postal_code', newInfo.address.postal_code);

    if (newInfo.address.complement) {
      formData.append('address_complement', newInfo.address.complement);
    }

    if(newInfo.profile_picture){
      formData.append('profile_picture', newInfo.profile_picture);
    }

    if(newInfo.cover_picture){
      formData.append('cover_picture', newInfo.cover_picture);
    }

    return this.httpClient.put<any>(environment.baseServerURL + environment.providerServiceURL + '/profile', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap({ // Invalidate the cache when the new info is posted
        next: () => this.invalidateCache()
      })
    )
  }

  /**
   * Changes the order of sections and performances of the profile of the connected user
   * @param body
   */
  reorderProfile(body: ReorderProviderProfileBody) : Observable<any> {
    return this.httpClient.put(environment.baseServerURL + environment.providerServiceURL + '/profile/order', body)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }

  /**
   * Uploads the provides #pictures to the server and adds them to the section with id #idSection
   * @param idSection
   * @param pictures
   */
  addBigSectionPictures(idSection: string, pictures: File[]) : Observable<any>{
    const data = new FormData();
    for (const picture of pictures){
      data.append('file', picture);
    }

    return this.httpClient.post(environment.baseServerURL + environment.providerServiceURL + `/section/${idSection}/picture`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap({ // On success, invalidate the cache to redownload the new profile
        next: () => this.invalidateCache()
      })
    );
  }

  /**
   * Removes the picture with filename #pictureName from the server and from the section #idSection
   * @param idSection
   * @param pictureName
   */
  removeBigSectionPicture(idSection: string, pictureName: string) : Observable<any>{
    return this.httpClient.delete(environment.baseServerURL + environment.providerServiceURL + `/section/${idSection}/picture/${pictureName}`)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }

  /**
   * Adds the given section to the profile of the connected user
   * @param section
   */
  addSection(section: UploadSectionBody) : Observable<any>{
    const data = new FormData();
    data.append('type', section.type);
    data.append('section_title', section.section_title);
    data.append('section_description', section.section_description);
    data.append('purchasable', JSON.stringify(section.purchasable));

    if (section.type === SectionType.SMALL) {
      data.append('preview_amount', JSON.stringify(section.preview_amount));
    }

    if (section.type === SectionType.BIG) {
      for (const picture of section.pictures || []) {
        // Append all the files to the same name to create an array
        data.append('pictures', picture);
      }
    }

    return this.httpClient.post(environment.baseServerURL + environment.providerServiceURL + '/section', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap({ // On success, invalidate the cache to redownload the new profile
        next: () => this.invalidateCache()
      })
    );
  }

  /**
   * Changes the given information about the given section. Does not update the images (use addBigSectionPictures() and
   * removeBigSectionPicture())
   * @param section
   */
  editSection(section: UpdateSectionBody) : Observable<any>{
    return this.httpClient.put(environment.baseServerURL + environment.providerServiceURL + '/section', section)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache(),
        })
      );
  }

  /**
   * Deletes the given section from the user's profile
   * @param section
   */
  deleteSection(section: ProviderProfileSection) : Observable<any>{
    return this.httpClient.delete(environment.baseServerURL + environment.providerServiceURL + '/section/' + section.id_section)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }

  /**
   * Posts the given performance
   * @param performance
   */
  addPerformance(performance : CreatePerformanceBody) : Observable<any>{
    const data = new FormData();
    data.append('performance_title', performance.performance_title);
    data.append('performance_description', performance.performance_description);
    data.append('performance_picture', performance.performance_picture);
    data.append('price_value', JSON.stringify(performance.price_value));
    data.append('price_unit', performance.price_unit);
    data.append('id_section', performance.id_section);

    return this.httpClient.post(environment.baseServerURL + environment.providerServiceURL + '/performance', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap({ // On success, invalidate the cache to redownload the new profile
        next: () => this.invalidateCache()
      })
    );
  }

  /**
   * Updates the given performance
   * @param performance
   */
  editPerformance(performance : UpdatePerformanceBody) : Observable<any>{
    const data = new FormData();
    data.append('performance_id', performance.performance_id);
    data.append('performance_title', performance.performance_title);
    data.append('performance_description', performance.performance_description);
    data.append('price_value', JSON.stringify(performance.price_value));
    data.append('price_unit', performance.price_unit);

    if (performance.performance_picture) data.append('performance_picture', performance.performance_picture);

    return this.httpClient.put(environment.baseServerURL + environment.providerServiceURL + '/performance', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap({ // On success, invalidate the cache to redownload the new profile
        next: () => this.invalidateCache()
      })
    );
  }

  /**
   * Delete the given performance from the user's profile.
   * @param performance
   */
  deletePerformance(performance: Performance) : Observable<any>{
    return this.httpClient.delete(environment.baseServerURL + environment.providerServiceURL + '/performance/' + performance.id_performance)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }
}
