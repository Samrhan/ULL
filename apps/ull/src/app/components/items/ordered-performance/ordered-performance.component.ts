import {Component, Input, TemplateRef} from '@angular/core';
import {Reservation, ReservationState} from "@ull/api-interfaces";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ReservationService} from "../../../services/reservation-service/reservation.service";
import {boolean} from "joi";

@Component({
  selector: 'ull-ordered-performance',
  templateUrl: './ordered-performance.component.html',
  styleUrls: ['./ordered-performance.component.scss'],
})
export class OrderedPerformanceComponent {
  @Input() reservation: Reservation | undefined;

  ReservationState = ReservationState;

  constructor(
    private modalService: BsModalService,
    private reservationService: ReservationService
  ) {}

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  acceptReservation(accepted: boolean) {
    if (this.reservation && confirm("Voulez-vous vraiment effectuer cette action ? Une fois qu'une réservation a été acceptée ou refusée, vous ne pouvez plus revenir en arrière."))
    this.reservationService.answerReservation({
      accepted: accepted,
      performance_id: this.reservation.performance.id_performance,
      project_id: this.reservation.project.project_id
    }).subscribe({
      next: () => location.reload(),
      error: () => alert("Action impossible, une erreur est survenue")
    })
  }

  formatDate(project_date: string) {
    return new Date(project_date).toLocaleDateString();
  }
}
