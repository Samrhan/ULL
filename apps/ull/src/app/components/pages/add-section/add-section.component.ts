import { Component, OnInit } from '@angular/core';
import {ProviderProfile, ProviderProfileSection, SectionType, UploadSectionBody} from "@ull/api-interfaces";
import {environment} from '../../../../environments/environment';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'ull-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
})
export class AddSectionComponent implements OnInit {
  profile : ProviderProfile | undefined;

  SectionType = SectionType
  environment = environment;

  newPictures : {file: File, url: string}[] = [];

  addSectionForm: FormGroup = this.formBuilder.group({
    section_type: new FormControl('big', Validators.required),
    section_title: new FormControl('', Validators.required),
    section_description: new FormControl('', Validators.maxLength(2000)),
    purchasable: new FormControl('true'),
    preview_amount: new FormControl('1', Validators.compose([
      Validators.max(5),
      Validators.min(1)
    ])),
  });

  sectionTypeTranslation = [
    {type: "big", text: 'Section de grande taille'},
    {type: "medium", text: 'Section de taille moyenne'},
    {type: "small", text: 'Section de petite taille'},
    {type: "info", text: "Section d'informations"},
  ];

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
      }
    });
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

  uploadProgress = 0;
  uploadInProgress = false;
  saveChanges(){
    this.uploadInProgress = true;
    const values = this.addSectionForm.value;

    const body: UploadSectionBody = {
      purchasable: values.purchasable,
      section_description: values.section_description,
      section_title: values.section_title,
      type: values.section_type
    }
    switch (values.section_type){
      case SectionType.BIG:
        body.pictures = this.newPictures.map(val => val.file);
        body.section_description = "";
        break;
      case SectionType.SMALL:
        body.preview_amount = values.preview_amount
        break;
      case SectionType.INFO:
        body.purchasable = "false";
    }
    this.userService.addSection(body)
      .pipe( // Upload tracking from https://www.ahmedbouchefra.com/angular/angular-9-8-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
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
        })
      )
      .subscribe({
        // Success handler : display a confirmation message for a few seconds
        next : (event) => {
          if(event){ // Ignore empty calls that occur during the upload
            this.router.navigateByUrl('/editProfile')
          }
        },
        // Error handler : alert() the user
        error: err => {
          this.uploadInProgress = false;
          switch (err.status){
            case 400:
              alert("Une erreur est survenue, veuillez vous assurer que tous les champs sont valides et réessayer.")
              break;
            default:
              alert("Une erreur est survenue, veuillez réessayer plus tard.")
              break;
          }
        }
      })
  }

  /**
   * Returns "true" if the given control is valid, false if it is invalid or doesn't exist
   * @param name
   */
  validInput(name: string) {
    const control: AbstractControl | null = this.addSectionForm.get(name);
    if (control){
      return !(control.invalid && (control.dirty || control.touched))
    } else {
      return false;
    }
  }
}
