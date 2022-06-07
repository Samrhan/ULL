import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../../services/reservation-service/reservation.service";
import {Reservation} from "@ull/api-interfaces";

@Component({
  selector: 'ull-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss'],
})
export class ReservationsListComponent implements OnInit {
  constructor(
    private reservationService : ReservationService
  ) {}

  reservationList : Reservation[] = [];

  ngOnInit(): void {
    this.reservationService.fetchUpcomingReservations().subscribe({
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
}
