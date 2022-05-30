import { Injectable } from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {HttpClient} from "@angular/common/http";

import {
  Address,
  EditProviderInfoBody, Performance, ProviderCompanyInformation,
  ProviderProfile, ProviderProfileSection, ProviderSectionType, ReorderProviderProfileBody
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
    return of({
      id_provider: "5f51f2b9-55d4-4b92-8288-49a3dfbec9cb",
      company_name: "Catering premium",
      company_description: "Un service traiteur de qualité",
      area_served: "Région parisienne",
      cover_picture: "../../../../assets/images/waitress-gff8ebb643_1920.jpg",
      profile_picture: "../../../../assets/images/cocktails.jpg",
      rating: 4.5,
      services: [
        {
          id_section: "84c9cb02-0a76-4a91-a9f0-9bca7a917725",
          type: "big",
          section_title: "Le bar",
          section_description: "",
          purchasable: true,
          pictures: [
            "../../../../assets/images/waitress-gff8ebb643_1920.jpg",
            "../../../../assets/images/beer-820011_1920.jpg",
            "../../../../assets/images/waitress-gff8ebb643_1920.jpg",
            "../../../../assets/images/beer-820011_1920.jpg"
          ],
          content: [
            {
              id_performance: "046e2f63-b8cb-44a3-9202-3fb3c748f00c",
              performance_title: "Service au bar",
              performance_description: "Nos cocktails, nos softs\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia accumsan mattis. Nulla elementum nunc turpis, quis condimentum lorem aliquet vitae. Ut vel augue nec lectus tristique sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac ultrices dui, vel vestibulum magna. Etiam consequat mi non arcu elementum, sed porta lacus vestibulum. Mauris porttitor fringilla tempus. Ut consectetur libero in libero vestibulum pretium.",
              price: {
                value: 1300,
                unit: "person"
              },
              picture: "../../../../assets/images/cocktails.jpg",
            }
          ]
        },
        {
          id_section: "0f506496-e57b-465a-b10d-87ca2ed19b4f",
          type: "info",
          section_title: "Texte d’information (FAQ, Conditions, etc)",
          section_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \nEtiam id vulputate dui, vel finibus nibh. Aliquam fringilla mi vel fermentum pulvinar. Ut venenatis nisi lorem, sit amet lacinia orci sollicitudin eget. In mattis est ex, eu tristique orci dignissim varius. \n\nPhasellus bibendum, felis vitae rutrum ultrices, velit odio elementum nibh, at ultrices ex lacus at tortor. Proin tincidunt volutpat efficitur. Ut est ante, blandit at nisi bibendum, efficitur sollicitudin ex. Suspendisse potenti. Vestibulum id lectus rutrum, pretium diam ut, euismod risus. Vestibulum mi magna, volutpat vitae viverra eget, consectetur eu enim. Mauris tincidunt rhoncus velit, et pharetra lacus hendrerit eu. \n\nEtiam mattis dolor eu euismod bibendum. Cras ultrices nec dolor gravida venenatis.",
          purchasable: false,
          content: []
        },
        {
          id_section: "b72c8885-8d72-4ab6-a32a-fbbbbbd47c76",
          type: "medium",
          section_title: "Notre carte",
          section_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id vulputate dui, vel finibus nibh.",
          purchasable: true,
          content: [
            {
              id_performance: "9744f6ec-5dc5-43df-9364-9ff309845035",
              performance_title: "Cupcakes",
              performance_description: "De très bons cupcakes",
              price: {
                value: 500,
                unit: "stack"
              },
              picture: "../../../../assets/images/cupcakes-gc0620a627_1920.jpg",
            },
            {
              id_performance: "0934496a-ac98-468d-8750-5149de3deb9f",
              performance_title: "Tiramisu",
              performance_description: "Meilleur dessert fait maison.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. \nEtiam id vulputate dui, vel finibus nibh. Aliquam fringilla mi vel fermentum pulvinar. Ut venenatis nisi lorem, sit amet lacinia orci sollicitudin eget. In mattis est ex, eu tristique orci dignissim varius.",
              price: {
                value: 500,
                unit: "stack"
              },
              picture: "../../../../assets/images/italian-food-2157246__340.png",
            }
          ]
        },
        {
          id_section: "d7d00f16-e09d-47e1-8653-94d6f236c287",
          type: "small",
          section_title: "La carte des pizza",
          section_description: "De bonnes pizza italiennes.",
          purchasable: false,
          preview_amount: 3,
          content: [
            {
              id_performance: "54e8f2d9-8b23-43c6-8ea2-f5f1ace208f1",
              performance_title: "Pizza margherita",
              performance_description: "Base tomate, mozarella, basilic",
              price: {
                value: 600,
                unit: "unit"
              },
              picture: "../../../../assets/images/telechargement.jpeg",
            },
            {
              id_performance: "8d370782-d690-4736-ae11-963f83cf20f9",
              performance_title: "Pizza 4 fromages",
              performance_description: "Base crème fraiche, gruyère, mozarella, chèvre, gorgonzola",
              price: {
                value: 1000,
                unit: "unit"
              },
              picture: "../../../../assets/images/telechargement_(1).jpeg",
            },
            {
              id_performance: "64856a10-b098-4fcf-8ac2-46eccd2e172f",
              performance_title: "Pizza pepperoni",
              performance_description: "Base tomate, mozarella, pepperoni",
              price: {
                value: 1250,
                unit: "unit"
              },
              picture: "../../../../assets/images/telechargement_(2).jpeg",
            },
            {
              id_performance: "fc378d3d-d447-43d5-a721-88fc4237e4b3",
              performance_title: "Pizza regina",
              performance_description: "Base tomate, mozarella, jambon, champignons",
              price: {
                value: 800,
                unit: "unit"
              },
              picture: "../../../../assets/images/telechargement_(3).jpeg",
            },
          ]
        },
      ]
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

  /**
   * Returns the private information of the connected user
   *
   * Employs a caching strategy : on the first fetch, the info is stored to sessionStorage, and this
   * value is reused for subsequent calls. Use the #force parameter to invalidate the cache.
   * @param force invalidates the cache and forces a reload from the server
   */
  fetchProviderCompanyInfo(force : boolean = false) : Observable<ProviderCompanyInformation> {
    return of({
      company_name: "Catering premium",
      company_description: "Un service traiteur de qualité",
      email: "lorem@ipsum.com",
      phone : "0601020304",
      area_served: "Région parisienne",
      cover_picture: "../../../../assets/images/waitress-gff8ebb643_1920.jpg",
      profile_picture: "../../../../assets/images/cocktails.jpg",
      address: {
        number: "1",
        street: "Rue de la paix",
        city: "Paris",
        postal_code: "75010",
        complement: ""
      }
    })

    /*if (force) {
      sessionStorage.removeItem('company-info')
    }

    const cachedInfo = sessionStorage.getItem('company-info');
    if (cachedInfo){
      return of(JSON.parse(cachedInfo));
    } else {
      return this.httpClient.get<ProviderCompanyInformation>(environment.baseServerURL + environment.providerServiceURL + '/provider_info')
        .pipe(
          tap({
            next: payload => sessionStorage.setItem('company-info', JSON.stringify(payload))
          })
        )
    }*/
  }

  editProfileInfo(newInfo : EditProviderInfoBody) : Observable<any> {
    const formData = new FormData();
    formData.append('company_name', newInfo.company_name)
    formData.append('company_description', newInfo.company_description)
    formData.append('email', newInfo.email)
    formData.append('phone', newInfo.phone)
    formData.append('area_served', newInfo.area_served)
    formData.append('address_number', newInfo.address.number)
    formData.append('address_street', newInfo.address.street)
    formData.append('address_city', newInfo.address.city)
    formData.append('address_postal_code', newInfo.address.postal_code)
    formData.append('address_complement', newInfo.address.complement)

    if(newInfo.profile_picture){
      formData.append('profile_picture', newInfo.profile_picture)
    }

    if(newInfo.cover_picture){
      formData.append('cover_picture', newInfo.cover_picture)
    }

    return this.httpClient.post<any>(environment.baseServerURL + environment.providerServiceURL + '/provider_profile', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap({ // Invalidate the cache when the new info is posted
        next: () => this.invalidateCache()
      })
    )
  }

  reorderProfile(body: ReorderProviderProfileBody) : Observable<any> {
    return this.httpClient.post(environment.baseServerURL + environment.providerServiceURL + '/provider_profile/updateOrder', body)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }

  deleteSection(section: ProviderProfileSection) : Observable<any>{
    return this.httpClient.delete(environment.baseServerURL + environment.providerServiceURL + '/section/' + section.id_section)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }

  deletePerformance(performance: Performance) : Observable<any>{
    return this.httpClient.delete(environment.baseServerURL + environment.providerServiceURL + '/performance/' + performance.id_performance)
      .pipe(
        tap({ // On success, invalidate the cache to redownload the new profile
          next: () => this.invalidateCache()
        })
      );
  }
}
