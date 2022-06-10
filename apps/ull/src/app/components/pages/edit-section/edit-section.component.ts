import {Component, OnInit} from '@angular/core';
import {ProviderProfile, ProviderProfileSection, SectionType} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from '../../../../environments/environment';
import {forkJoin, map, Observable, of, tap} from "rxjs";
import {HttpEventType} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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

  newPictures : {file: File, url: string}[] = [];
  picturesToDelete : string[] = []

  updateSectionForm: FormGroup = this.formBuilder.group({
    section_title: new FormControl('', Validators.required),
    section_description: new FormControl('', Validators.maxLength(2000)),
    purchasable: new FormControl(''),
    preview_amount: new FormControl('', Validators.compose([
      Validators.max(5),
      Validators.min(1)
    ])),
  });

  constructor(
    private userService: UserService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userService.fetchProviderProfile().subscribe({
      next: value => {
        this.profile = value;
        this.section = value.services.filter((value : ProviderProfileSection) => value.id_section === this.route.snapshot.params['idSection'])[0];

        if (!this.section) {
          this.router.navigateByUrl('/profile');
        }

        this.updateSectionForm.get("section_title")?.setValue(this.section.section_title);
        this.updateSectionForm.get("section_description")?.setValue(this.section.section_description);
        this.updateSectionForm.get("purchasable")?.setValue(this.section.purchasable);
        if (this.section.type === SectionType.SMALL) this.updateSectionForm.get("preview_amount")?.setValue(this.section.preview_amount);
      }
    });
  }

  deletePicture(imageUrl: string) {
    this.picturesToDelete.push(imageUrl)
  }

  undeletePicture(imageUrl: string){
    this.picturesToDelete = this.picturesToDelete.filter(val => val !== imageUrl);
  }

  addPicture(event: Event){
    const target = event.target as HTMLInputElement;
    target.disabled = true;
    if (target.files && target.files.length > 0) {
      const newPicture = {
        file : target.files[0],
        url: ''
      };
      const reader = new FileReader();
      reader.onloadend = () => {
        newPicture.url = (reader.result as string);
        this.newPictures.push(newPicture);
        target.value = "";
        target.disabled = false;
      };
      reader.readAsDataURL(newPicture.file);
    }
  }

  cancelAddPicture(image: { file: File, url: string}) {
    this.newPictures = this.newPictures.filter(picture => picture !== image);
  }

  allRequestsDone = false;
  /**
   * Triggers all the needed requests to apply the changes, and reloads the page when all requests are done (success or
   * failure) to fetch the new data.
   */
  saveChanges(){
    if (this.section && confirm("Êtes-vous sûr ? Cette action est irréversible.")) {
      const trackedObservables : Observable<any>[] = [];

      if (this.section.type == SectionType.BIG){
        for (const imageUrl of this.picturesToDelete){
          trackedObservables.push(this.deleteImage(imageUrl));
        }

        if (this.newPictures.length !== 0) {
          trackedObservables.push(this.uploadBigSectionImages());
        }
      }

      const values = this.updateSectionForm.value;
      trackedObservables.push(
        this.userService.editSection({
          id_section: this.section.id_section,
          preview_amount: values.preview_amount,
          purchasable: values.purchasable,
          section_description: values.section_description,
          section_title: values.section_title
        })
      );

      forkJoin(trackedObservables).subscribe({
        next : () => {
          this.allRequestsDone = true;
          location.reload()
        },
        error : () => {
          alert("Les modifications de la section n'ont pas pu être sauvegardées.");
          this.allRequestsDone = true;
          location.reload()
        }
      })
    }
  }

  deleteImage(imageUrl : string) : Observable<any>{
    return this.userService.removeBigSectionPicture(this.section?.id_section || '', imageUrl);
  }

  uploadProgress  = 0;
  uploadPicturesInProgress  = false;
  /**
   * Sends the list of pictures to add to userService and tracks the progress of the upload
   */
  uploadBigSectionImages() : Observable<any>{
    if (this.newPictures.length === 0) return of('');

    this.uploadPicturesInProgress = true;
    return this.userService.addBigSectionPictures(this?.section?.id_section || '', this.newPictures.map(val => val.file)).pipe(
      // Upload tracking from https://www.ahmedbouchefra.com/angular/angular-9-8-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
      // Map the output of the post request since 'reportProgress' has been set to true and observe to 'events'.
      // Thus, for events of type UploadProgress we simply update the progress variable and return void.
      // We only return events of type Response to subscribe().
      map(event => { // React every time an event is emitted
        switch (event.type) {
          case HttpEventType.UploadProgress: // If it's an update about the upload progress, update the upload bar and do nothing
            this.uploadProgress = Math.round(event.loaded * 100 / event.total);
            return;
          case HttpEventType.Response: // If it's a response, pass it to the next handler
            return event;
        }
      }),
      tap({
        // Hide the progress bar/spinner when the upload finishes, no matter if it's a success or error
        next: () => this.uploadPicturesInProgress = false,
        error: () => this.uploadPicturesInProgress = false
      })
    );
  }

  /**
   * Returns "true" if the given control is valid, false if it is invalid or doesn't exist
   * @param name
   */
  validInput(name: string) {
    const control: AbstractControl | null = this.updateSectionForm.get(name);
    if (control){
      return !(control.invalid && (control.dirty || control.touched))
    } else {
      return false;
    }
  }
}
