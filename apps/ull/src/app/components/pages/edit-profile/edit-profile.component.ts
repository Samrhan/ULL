import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {
  Performance,
  ProviderProfile,
  ProviderProfileSection,
  ProviderSectionType,
  ReorderProviderProfileBody
} from "@ull/api-interfaces";

import {
  faArrowDown,
  faArrowRight,
  faArrowRightToBracket,
  faArrowUp,
  faPencil,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'ull-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  sectionNames = {
    "big" : "Grande",
    "medium" : "Moyenne",
    "small" : "Petite",
    "info" : "Information"
  };

  editOrder = false;

  faPencil = faPencil;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faTrash = faTrash;
  faArrowRightToBracket = faArrowRightToBracket;
  faArrowRight = faArrowRight;

  modalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  profile : ProviderProfile | undefined;

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.userService.fetchProviderProfile().subscribe({
      next: value => this.profile = value
    });
  }

  move<T>(item: T, list : T[], direction : "up" | "down") {
    const itemIndex = list.findIndex((o : T) => o === item);
    switch (direction) {
      case "up":
        if (itemIndex === 0) return;
        [list[itemIndex], list[itemIndex - 1]] = [list[itemIndex - 1], list[itemIndex]]
        break;
      case "down":
        if (itemIndex === list.length - 1) return;
        [list[itemIndex], list[itemIndex + 1]] = [list[itemIndex + 1], list[itemIndex]]
        break;
    }
  }

  orderChangeSuccess = false;
  orderChangeFailure = false;
  /**
   * Formats this.profile.services into a ReorderProviderProfileBody to send to userService.reorderProfile()
   */
  saveOrderChanges() {
    const newOrder : ReorderProviderProfileBody = this.profile?.services
      .map(
          (elem : ProviderProfileSection ) => {
          return {
            id_section : elem.id_section,
            id_performances : elem.content.map((val : Performance) => val.id_performance)
          };
        }
      ) || []
    this.userService.reorderProfile(newOrder).subscribe({
      next: () => {
        this.editOrder = false;
        this.orderChangeSuccess = true;
        setTimeout(() => this.orderChangeSuccess = false, 3000)
        this.fetchProfile();
      },
      error: () => {
        this.editOrder = false;
        this.orderChangeFailure = true;
        setTimeout(() => this.orderChangeFailure = false, 3000)
        this.fetchProfile();
      }
    })
  }

  cancelOrderChanges() {
    location.reload();
  }

  changeSectionCallback : (...args: any[]) => void = () => {};
  performanceToDisplaceName = "";
  selectedSection ?: ProviderProfileSection;
  changeSection(performance: Performance, oldSection : ProviderProfileSection, newSection : ProviderProfileSection) {
    // If the new section is not of type info, and it is not a big section with something already in it
    if (this.sectionsWithAvailableSpace().includes(newSection)){
      oldSection.content = oldSection.content.filter(item => item !== performance);
      newSection.content.push(performance);
      this.closeChangeSectionModal();
    }
  }

  openChangeSectionModal(performance: Performance, section : ProviderProfileSection, template: TemplateRef<any>) {
    this.performanceToDisplaceName = performance.performance_title;
    this.modalRef = this.modalService.show(template);
    this.changeSectionCallback = (newSection : ProviderProfileSection) => this.changeSection(performance, section, newSection)
  }

  closeChangeSectionModal(){
    this.modalRef?.hide();
    this.changeSectionCallback = () => {};
    this.performanceToDisplaceName = "";
    this.selectedSection = undefined;
  }

  sectionsWithAvailableSpace() : ProviderProfileSection[]{
    if (this.profile?.services){
      return this.profile.services.filter(item =>
        // Only keep sections that aren't of type info, and remove the big sections that are full
        item.type !== ProviderSectionType.info && !(item.type === ProviderSectionType.big && item.content.length > 0)
      )
    } else {
      return []
    }
  }
}
