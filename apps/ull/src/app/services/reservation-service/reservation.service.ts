import {Injectable} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {
  AnswerReservationRequestBody,
  PriceUnit,
  ProjectState,
  Reservation,
  ReservationIdentifier,
  ReservationState
} from "@ull/api-interfaces";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) { }

  invalidateCache(){
    sessionStorage.clear();
  }

  fetchUpcomingReservations(force: boolean = false) : Observable<ReservationIdentifier[]>{
    return of([
      {
        performance_id: "86deef3e-add4-4060-9c5c-cecfff6a2fc1",
        project_id: "1442007f-b3a2-4757-91f5-1f34c62a5420",
      },{
        performance_id: "bb5851ce-25a6-4131-ab6a-054f03081e57",
        project_id: "1442007f-b3a2-4757-91f5-1f34c62a5420",
      },{
        performance_id: "be45390e-5104-4587-8238-d53048321923",
        project_id: "13638961-8d8e-488e-a424-c338d8ff4352",
      },
    ] as ReservationIdentifier[]);

    // if (force) {
    //   sessionStorage.removeItem('accepted-reservations');
    // }
    //
    // const cachedReservations = sessionStorage.getItem('accepted-reservations');
    // if (cachedReservations){
    //   return of(JSON.parse(cachedReservations));
    // } else {
    //   return this.httpClient.get<ReservationIdentifier[]>(environment.baseServerURL + environment.reservationServiceURL + '/provider_reservations')
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem('accepted-reservations', JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  fetchRequestedReservations(force: boolean = false) : Observable<ReservationIdentifier[]> {
    return of([
      {
        performance_id: "8cdb2ec9-cce6-498d-9d90-c8fe0f874e4b",
        project_id: "73cfb249-4b65-4c82-93f8-9a05e4540ec1",
      },{
        performance_id: "bb5851ce-25a6-4131-ab6a-054f03081e57",
        project_id: "73cfb249-4b65-4c82-93f8-9a05e4540ec1",
      }
    ] as ReservationIdentifier[]);
    // if (force) {
    //   sessionStorage.removeItem('requested-reservations');
    // }
    //
    // const cachedReservations = sessionStorage.getItem('requested-reservations');
    // if (cachedReservations){
    //   return of(JSON.parse(cachedReservations));
    // } else {
    //   return this.httpClient.get<ReservationIdentifier[]>(environment.baseServerURL + environment.reservationServiceURL + '/requested_provider_reservations')
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem('requested-reservations', JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  fetchReservation(reservation: ReservationIdentifier, force: boolean = false) : Observable<Reservation>{
    if (reservation.project_id === "73cfb249-4b65-4c82-93f8-9a05e4540ec1"){
      return of({
        performance: {
          id_performance: "8cdb2ec9-cce6-498d-9d90-c8fe0f874e4b",
          performance_title: "Pizza",
          performance_description: "Lorem ipsum dolor sit amet",
          price: {
            value: 600,
            unit: PriceUnit.absolute
          },
          picture: "telechargement_(3).jpeg",
        },
        project: {
          project_id: "73cfb249-4b65-4c82-93f8-9a05e4540ec1",
          name: "Anniversaire 1",
          customer_display_name: "Jean Dupont",
          project_date: new Date('2022-06-16'),
          description: "Lorem ipsum dolor sit amet",
          image: "waitress-gff8ebb643_1920.jpg",
          amount_of_people: 5,
          state: ProjectState.pending_validation,
          address: {
            number: "1",
            street: "Rue de la paix",
            city: "Paris",
            postal_code: "75010",
            complement: ""
          }
        },
        provider_id: "5f51f2b9-55d4-4b92-8288-49a3dfbec9cb",
        quantity: 1,
        state: Math.random() > 0.3 ? (Math.random() > 0.5 ? ReservationState.ACCEPTED : ReservationState.REJECTED ): ReservationState.PENDING
      });
    } else {
      return of({
        performance: {
          id_performance: "86deef3e-add4-4060-9c5c-cecfff6a2fc1",
          performance_title: "Pizza",
          performance_description: "Lorem ipsum dolor sit amet",
          price: {
            value: 600,
            unit: PriceUnit.absolute
          },
          picture: "telechargement_(3).jpeg",
        },
        project: {
          project_id: "1442007f-b3a2-4757-91f5-1f34c62a5420",
          name: "Anniversaire 1",
          customer_display_name: "Jean Dupont",
          project_date: new Date('2022-06-16'),
          description: "Lorem ipsum dolor sit amet",
          image: "waitress-gff8ebb643_1920.jpg",
          amount_of_people: 5,
          state: ProjectState.pending_validation,
          address: {
            number: "1",
            street: "Rue de la paix",
            city: "Paris",
            postal_code: "75010",
            complement: ""
          }
        },
        provider_id: "5f51f2b9-55d4-4b92-8288-49a3dfbec9cb",
        quantity: 1,
        state: ReservationState.PAYED
      });
    }

    // if (force) {
    //   sessionStorage.removeItem(`reservation-${reservation.project_id}-${reservation.performance_id}`);
    // }
    //
    // const cachedReservations = sessionStorage.getItem(`reservation-${reservation.project_id}-${reservation.performance_id}`);
    // if (cachedReservations){
    //   return of(JSON.parse(cachedReservations));
    // } else {
    //   return this.httpClient.get<Reservation>(environment.baseServerURL + environment.reservationServiceURL + `/reservation/${reservation.project_id}/${reservation.performance_id}`)
    //     .pipe(
    //       tap({
    //         next: payload => sessionStorage.setItem(`reservation-${reservation.project_id}-${reservation.performance_id}`, JSON.stringify(payload))
    //       })
    //     )
    // }
  }

  answerReservation(body: AnswerReservationRequestBody) : Observable<void> {
    return this.httpClient.post<void>(environment.baseServerURL + environment.reservationServiceURL + '/answer_reservation_request', body)
      .pipe(tap(() => this.invalidateCache()));
  }

}
