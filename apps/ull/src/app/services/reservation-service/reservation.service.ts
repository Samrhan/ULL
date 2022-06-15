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
    if (force) {
      sessionStorage.removeItem('accepted-reservations');
    }

    const cachedReservations = sessionStorage.getItem('accepted-reservations');
    if (cachedReservations){
      return of(JSON.parse(cachedReservations));
    } else {
      return this.httpClient.get<ReservationIdentifier[]>(environment.baseServerURL + environment.reservationServiceURL + '/provider_reservations')
        .pipe(
          tap({
            next: payload => sessionStorage.setItem('accepted-reservations', JSON.stringify(payload))
          })
        )
    }
  }

  fetchRequestedReservations(force: boolean = false) : Observable<ReservationIdentifier[]> {
    if (force) {
      sessionStorage.removeItem('requested-reservations');
    }

    const cachedReservations = sessionStorage.getItem('requested-reservations');
    if (cachedReservations){
      return of(JSON.parse(cachedReservations));
    } else {
      return this.httpClient.get<ReservationIdentifier[]>(environment.baseServerURL + environment.reservationServiceURL + '/requested_provider_reservations')
        .pipe(
          tap({
            next: payload => sessionStorage.setItem('requested-reservations', JSON.stringify(payload))
          })
        )
    }
  }

  fetchReservation(reservation: ReservationIdentifier, force: boolean = false) : Observable<Reservation>{
    if (force) {
      sessionStorage.removeItem(`reservation-${reservation.project_id}-${reservation.performance_id}`);
    }

    const cachedReservations = sessionStorage.getItem(`reservation-${reservation.project_id}-${reservation.performance_id}`);
    if (cachedReservations){
      return of(JSON.parse(cachedReservations));
    } else {
      return this.httpClient.get<Reservation>(environment.baseServerURL + environment.reservationServiceURL + `/reservation/${reservation.project_id}/${reservation.performance_id}`)
        .pipe(
          tap({
            next: payload => sessionStorage.setItem(`reservation-${reservation.project_id}-${reservation.performance_id}`, JSON.stringify(payload))
          })
        )
    }
  }

  answerReservation(body: AnswerReservationRequestBody) : Observable<void> {
    return this.httpClient.post<void>(environment.baseServerURL + environment.reservationServiceURL + '/answer_reservation_request', body)
      .pipe(tap(() => this.invalidateCache()));
  }

}
