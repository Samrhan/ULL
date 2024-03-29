import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserService} from "../../../services/user-service/user.service";
import {
  Performance,
  ProviderProfile,
  ProviderProfileSection,
  SectionType,
  ReorderProviderProfileBody
} from "@ull/api-interfaces";

import {
  faArrowDown,
  faArrowRight,
  faArrowRightToBracket,
  faArrowUp,
  faPencil,
  faTrash,
  faBan,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'ull-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  /**
   * Allows for easy conversion from enum to French
   */
  sectionNames = {
    "big" : "Grande",
    "medium" : "Moyenne",
    "small" : "Petite",
    "info" : "Information"
  };

  // Indicated if the user is currently modifying the order of the sections/performances
  editOrder = false;

  faPencil = faPencil;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faTrash = faTrash;
  faArrowRightToBracket = faArrowRightToBracket;
  faArrowRight = faArrowRight;
  faBan = faBan;
  faPlus = faPlus;

  modalRef?: BsModalRef;

  profile : ProviderProfile | undefined;

  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.fetchProfile();
  }

  /**
   * Fetches the profile from userService and stores it into this.profile
   */
  fetchProfile() {
    this.userService.fetchProviderProfile().subscribe({
      next: value => this.profile = value
    });
  }

  /**
   * Moves #item one index up or down (depending on #direction) in #list. Will not move the item if it's at the edge
   * of the list and moving in the wrong direction.
   * @param item
   * @param list
   * @param direction
   */
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

  /**
   * Simply reloads to refetch the profile data and re-display the list properly
   */
  cancelOrderChanges() {
    location.reload();
  }

  /**
   * this.changeSectionCallback stores the context for calling changeSection(). Indeed, since it needs to know
   * the performance and the oldSection, but we don't have them anymore when changeSection() is called, we have
   * to save the context when openChangeSectionModal() is called.
   *
   * Instead of storing the performance and section in class variables, we store a callback that only takes the newSection
   * as argument and memorizes the performance and oldSection to be able to call changeSection(). This method is
   * generated by openChangeSectionModal().
   */
  changeSectionCallback : (...args: any[]) => void = () => {};
  performanceToDisplaceName = "";
  selectedSection ?: ProviderProfileSection;
  /**
   * Gets called by this.changeSectionCallback when the #newSection is known
   * @param performance
   * @param oldSection
   * @param newSection
   */
  changeSection(performance: Performance, oldSection : ProviderProfileSection, newSection : ProviderProfileSection) {
    // If the new section is not of type info, and it is not a big section with something already in it
    if (this.sectionsWithAvailableSpace().includes(newSection)){
      oldSection.content = oldSection.content.filter(item => item !== performance);
      newSection.content.push(performance);
      this.closeChangeSectionModal();
    }
  }

  /**
   * Opens the modal, and initializes this.changeSectionCallback with #performance and #section
   * @param performance
   * @param section
   * @param template
   */
  openChangeSectionModal(performance: Performance, section : ProviderProfileSection, template: TemplateRef<any>) {
    this.selectedSection = section;
    this.performanceToDisplaceName = performance.performance_title;
    this.modalRef = this.modalService.show(template);
    this.changeSectionCallback = (newSection : ProviderProfileSection) => this.changeSection(performance, section, newSection)
  }

  closeChangeSectionModal(){
    this.modalRef?.hide();
    // Reset the modal's information
    this.changeSectionCallback = () => {};
    this.performanceToDisplaceName = "";
    this.selectedSection = undefined;
  }

  /**
   * Returns profile.services filtered to only keep the sections that can contain one more performance.
   *
   * This means that it excludes "info" type sections, and "big" sections that already have one performance.
   */
  sectionsWithAvailableSpace() : ProviderProfileSection[]{
    if (this.profile?.services){
      return this.profile.services.filter(item =>
        // Only keep sections that aren't of type info, and remove the big sections that are full
        item.type !== SectionType.info && !(item.type === SectionType.big && item.content.length > 0)
      )
    } else {
      return []
    }
  }

  /**
   * Tells userService to delete the provided section. Checks if it's empty and asks for user confirmation.
   * @param section
   */
  deleteSection(section: ProviderProfileSection) {
    if(section.content.length === 0 && confirm("Cette action est irréversible, voulez-vous vraiment continuer ?")){
      this.userService.deleteSection(section).subscribe(() => this.fetchProfile());
    }
  }

  /**
   * Tells userService to delete the provided performance. Asks for user confirmation
   * @param performance
   */
  deletePerformance(performance: Performance) {
    if(confirm("Cette action est irréversible, voulez-vous vraiment continuer ?\nSupprimer cette prestation ne vous délivre pas des commandes déjà passées.")){
      this.userService.deletePerformance(performance).subscribe(() => this.fetchProfile());
    }
  }
}
