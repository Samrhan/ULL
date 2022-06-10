import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Category} from "@ull/api-interfaces";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CategorizationService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  invalidateCache(){
    sessionStorage.clear();
  }

  fetchCategories() : Observable<Category[]> {
    return of([
      {
        name: "Musique",
        picture: ""
      },
      {
        name: "Magie",
        picture: ""
      },
      {
        name: "Traiteur",
        picture: "chef-gdaa51b2fa_1920.jpg"
      },
      {
        name: "Art du spectacle",
        picture: ""
      },
    ]);

    // const cachedCategories = sessionStorage.getItem('categories');
    // if (cachedCategories){
    //   return of(JSON.parse(cachedCategories));
    // } else {
    //   return this.httpClient.get<Category[]>(environment.baseServerURL + environment.discoveryServiceURL + '/provider_category')
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem('categories', JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  fetchTags() : Observable<string[]> {
    return of([
      "Cuisine française",
      "Cuisine italienne",
      "Cuisine américaine",
      "Service au bar",
      "Service à table",
      "Buffet",
      "Chanson française",
      "Pop",
      "Rap",
      "Magie pour les enfants",
      "Magie pour adulte",
      "One man show",
      "Troupe",
    ])

    // const cachedTags = sessionStorage.getItem('tags');
    // if (cachedTags){
    //   return of(JSON.parse(cachedTags));
    // } else {
    //   return this.httpClient.get<string[]>(environment.baseServerURL + environment.discoveryServiceURL + '/provider_tags')
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem('tags', JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  getCurrentCategory(force: boolean) : Observable<Category> {
    return of({
      name: "Traiteur",
      picture: "chef-gdaa51b2fa_1920.jpg"
    } as Category)

    // if (force) {
    //   sessionStorage.removeItem('company-category');
    // }
    //
    // const cachedCategory = sessionStorage.getItem('company-category');
    // if (cachedCategory){
    //   return of(JSON.parse(cachedCategory));
    // } else {
    //   const idProvider = this.authenticationService.getProviderId();
    //   return this.httpClient.get<Category>(environment.baseServerURL + environment.discoveryServiceURL + '/provider_category/' + idProvider)
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem('company-category', JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  getCurrentTags(force: boolean) : Observable<string[]> {
    return of([
      "Cuisine française",
      "Service au bar",
    ])

    // if (force) {
    //   sessionStorage.removeItem('company-tags');
    // }
    //
    // const cachedTags = sessionStorage.getItem('company-tags');
    // if (cachedTags){
    //   return of(JSON.parse(cachedTags));
    // } else {
    //   const idProvider = this.authenticationService.getProviderId();
    //   return this.httpClient.get<string[]>(environment.baseServerURL + environment.discoveryServiceURL + '/provider_tags/' + idProvider)
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem('company-tags', JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  setCategory(category: Category) : Observable<void>{
    return this.httpClient.put<void>(environment.baseServerURL + environment.discoveryServiceURL + '/provider_category', category)
      .pipe(tap(() => this.invalidateCache()));
  }

  setTags(tags: string[]) : Observable<void>{
    return this.httpClient.put<void>(environment.baseServerURL + environment.discoveryServiceURL + '/provider_tags', tags)
      .pipe(tap(() => this.invalidateCache()));
  }
}
