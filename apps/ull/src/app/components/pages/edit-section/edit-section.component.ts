import { Component, OnInit } from '@angular/core';
import {ProviderProfile, ProviderProfileSection, SectionType} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ull-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
  profile : ProviderProfile | undefined;
  section : ProviderProfileSection | undefined;

  SectionType = SectionType
  environment = environment;

  constructor(
    private userService: UserService,
    private router : Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.fetchProviderProfile().subscribe({
      next: value => {
        this.profile = value;
        this.section = value.services.filter((value : ProviderProfileSection) => value.id_section === this.route.snapshot.params['idSection'])[0];

        if (!this.section) {
          this.router.navigateByUrl('/profile');
        }
      }
    });
  }

  deletePicture(imageUrl: string) {
    if (this.section && confirm("Êtes-vous sûr ? Cette action est irréversible")) {
      this.userService.removeBigSectionPicture(this.section.id_section, imageUrl).subscribe({
        next: () => {
          if(this.section && this.section.pictures){
            // On success, remove the image
            this.section.pictures = this.section.pictures.filter(val => val !== imageUrl);
          }
        }
      })
    }
  }
}
