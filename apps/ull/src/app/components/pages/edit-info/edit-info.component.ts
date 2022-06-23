import {Component, OnInit} from '@angular/core';
import {ProviderCompanyInformation} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs";
import {HttpEventType} from "@angular/common/http";

import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'ull-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  faCamera = faCamera

  environment = environment;

  coverPictureUrl = '';
  profilePictureUrl = '';

  info : ProviderCompanyInformation | undefined;

  updateInfoForm: FormGroup = this.formBuilder.group({
    company_name: new FormControl('', Validators.required),
    company_description: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(2000),
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    phone: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[+]33[0-9]{9}$'),
    ])),
    area_served: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postal_code: new FormControl('', Validators.required),
    complement: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Force fetch the values at load
    this.fetchData();
  }

  fetchData() {
    this.userService.fetchProviderCompanyInfo(true).subscribe({
      next: value => {
        this.info = value
        // Fill the form with default values
        this.updateInfoForm.get("company_name")?.setValue(value.company_name);
        this.updateInfoForm.get("company_description")?.setValue(value.company_description);
        this.updateInfoForm.get("email")?.setValue(value.email);
        this.updateInfoForm.get("phone")?.setValue(value.phone);
        this.updateInfoForm.get("area_served")?.setValue(value.area_served);
        this.updateInfoForm.get("number")?.setValue(value.address.number);
        this.updateInfoForm.get("street")?.setValue(value.address.street);
        this.updateInfoForm.get("city")?.setValue(value.address.city);
        this.updateInfoForm.get("postal_code")?.setValue(value.address.postal_code);
        this.updateInfoForm.get("complement")?.setValue(value.address.complement);

        this.profilePictureUrl = environment.providerPicturesURL + this.authService.getProviderId() + '/' +  encodeURIComponent(value.profile_picture);
        this.coverPictureUrl = environment.providerPicturesURL + this.authService.getProviderId() + '/' + encodeURIComponent(value.cover_picture);
      }
    })
  }

  newCoverPicture: File | undefined;
  newProfilePicture: File | undefined;
  /**
   * Stores the file from #event into the desired variable selected by #targetVariable. Also fetches the file to display
   * it instead of the current picture. If the file is cancelled, displays the default picture again instead.
   * @param targetVariable
   * @param event
   */
  onPictureSelected(targetVariable : string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (targetVariable === "coverPicture") {
        this.newCoverPicture = target.files[0];
        this.replaceDefaultPictureUrl(this.newCoverPicture, (result) => this.coverPictureUrl = result)
      } else if (targetVariable === "profilePicture") {
        this.newProfilePicture = target.files[0];
        this.replaceDefaultPictureUrl(this.newProfilePicture, (result) => this.profilePictureUrl = result)
      }
    } else {
      if (targetVariable === "coverPicture") {
        this.newCoverPicture = undefined;
        this.coverPictureUrl = environment.providerPicturesURL + this.authService.getProviderId() + '/' + encodeURIComponent(this.info?.cover_picture || '');
      } else if (targetVariable === "profilePicture") {
        this.newProfilePicture = undefined;
        this.profilePictureUrl = environment.providerPicturesURL + this.authService.getProviderId() + '/' + encodeURIComponent(this.info?.profile_picture || '');
      }
    }
  }

  /**
   * Creates a FileReader to read #file as URL. When the reader has finished, calls #affectationCallback with `reader.result`
   * as parameter.
   * @param file
   * @param affectationCallback
   */
  replaceDefaultPictureUrl(file: File, affectationCallback: (result: string) => void){
    const reader = new FileReader();
    reader.onloadend = () => {affectationCallback(reader.result as string)};
    reader.readAsDataURL(file);
  }

  uploadProgress = 0; // Used for the upload progress bar
  uploadInProgress = false;
  uploadSuccess = false;
  updateInfo() {
    this.uploadInProgress = true;
    const values = this.updateInfoForm.value;

    this.userService.editProfileInfo({ // Convert the data from the form into a EditProviderInfoBody object
      address: {
        number : values.number,
        street : values.street,
        city : values.city,
        postal_code : values.postal_code,
        complement : values.complement
      },
      area_served: values.area_served,
      company_description: values.company_description,
      company_name: values.company_name,
      email: values.email,
      phone: values.phone,
      cover_picture: this.newCoverPicture,
      profile_picture: this.newProfilePicture
    }).pipe( // Upload tracking from https://www.ahmedbouchefra.com/angular/angular-9-8-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
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
    ).subscribe({
      // Success handler : display a confirmation message for a few seconds
      next : (event) => {
        if(event){ // Ignore empty calls that occur during the upload
          this.uploadSuccess = true;
          this.uploadInProgress = false;
          setTimeout(() => this.uploadSuccess = false, 3000);
          this.fetchData();
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
    const control: AbstractControl | null = this.updateInfoForm.get(name);
    if (control){
      return !(control.invalid && (control.dirty || control.touched))
    } else {
      return false;
    }
  }
}
