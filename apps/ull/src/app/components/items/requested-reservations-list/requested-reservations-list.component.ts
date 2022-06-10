import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../../services/reservation-service/reservation.service";
import {Reservation, ReservationState} from "@ull/api-interfaces";

@Component({
  selector: 'ull-requested-reservations-list',
  templateUrl: './requested-reservations-list.component.html',
  styleUrls: ['./requested-reservations-list.component.scss'],
})
export class RequestedReservationsListComponent implements OnInit {
  constructor(
    private reservationService : ReservationService
  ) {}

  localStoragePrefKey = 'filter-pending-requests-on-reservation-list-page';
  filterPendingRequests = false;
  ReservationState = ReservationState;

  reservationList : Reservation[] = [];

  ngOnInit(): void {
    this.filterPendingRequests = JSON.parse(localStorage.getItem(this.localStoragePrefKey) || 'false');

    this.reservationService.fetchRequestedReservations().subscribe({
      next: reservationIdentifierList => {
        reservationIdentifierList.forEach(reservationIdentifier => {
          this.reservationService.fetchReservation(reservationIdentifier).subscribe({
            next: reservation => {
              this.reservationList.push(reservation);
              this.reservationList.sort(this.sortChronologically)
            }
          })
        })
      }
    })
  }

  sortChronologically(a: Reservation, b: Reservation) : number {
    return b.project.project_date.getTime() - a.project.project_date.getTime();
  }

  savePref() {
    localStorage.setItem(this.localStoragePrefKey, JSON.stringify(this.filterPendingRequests));
  }
}
