import { Component, OnInit } from '@angular/core';
import {CategorizationService} from "../../../services/categorization-service/categorization.service";
import {Category, ProviderCompanyInformation} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";
import {Router} from "@angular/router";
import {forkJoin} from "rxjs";

@Component({
  selector: 'ull-edit-categorization',
  templateUrl: './edit-categorization.component.html',
  styleUrls: ['./edit-categorization.component.scss'],
})
export class EditCategorizationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private categorizationService: CategorizationService,
    private router: Router
  ) {}

  possibleCategories: Category[] = [];
  possibleTags: string[] = [];

  currentCategoryName = "";
  currentCategory : Category | undefined;

  typedTag = "";
  currentTags : string[] = [];

  info : ProviderCompanyInformation | undefined;

  ngOnInit() {
    // Force fetch the values at load
    this.fetchData();
  }

  fetchData(){
    this.userService.fetchProviderCompanyInfo(true).subscribe({
      next: value => {
        this.info = value
      }
    });

    this.categorizationService.fetchCategories().subscribe((value) => this.possibleCategories = value.sort(this.sortAlphabetically));
    this.categorizationService.fetchTags().subscribe((value) => this.possibleTags = value);

    this.categorizationService.getCurrentCategory(true).subscribe({
      next: value => {
        this.currentCategory = value
        this.currentCategoryName = value.name
      },
      error: (err) => {
        if (err.status !== 404){ // Case where the provider doesn't have a category yet
          this.router.navigateByUrl('/profile')
        }
      }
    })
    this.categorizationService.getCurrentTags(true).subscribe({
      next: value => this.currentTags = value,
      error: () => this.router.navigateByUrl('/profile')
    })
  }

  changeCurrentCategory() {
    this.currentCategory = this.possibleCategories.filter(val => val.name === this.currentCategoryName)[0];
  }

  sortAlphabetically(a: Category, b: Category) : number {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }

  removeTag(tag: string) {
    this.currentTags = this.currentTags.filter(val => val !== tag);
  }

  autocompleteCandidates() : string[] {
    return this.possibleTags.filter(val => !this.currentTags.includes(val)).sort();
  }

  addTag($event: KeyboardEvent) {
    if ($event.key === "Enter" && this.possibleTags.includes(this.typedTag) && !this.currentTags.includes(this.typedTag)) {
      this.currentTags.push(this.typedTag);
      this.typedTag = "";
    }
  }

  saveChanges() {
    if (this.currentCategory && confirm("Êtes-vous sûr ? Les anciennes valeurs seront écrasées.")){
      const categoryRequest = this.categorizationService.setCategory(this.currentCategory);
      const tagRequest = this.categorizationService.setTags(this.currentTags);

      forkJoin([categoryRequest, tagRequest]).subscribe({
        next: () => this.router.navigateByUrl('/profile'),
        error: () => alert("Une erreur est survenue et les changements ne peuvent être appliqués.")
      })
    }
  }
}
