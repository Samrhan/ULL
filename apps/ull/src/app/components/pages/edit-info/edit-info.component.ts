import {Component, OnInit} from '@angular/core';
import {ProviderCompanyInformation} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, map} from "rxjs";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'ull-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
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
    area_served: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postal_code: new FormControl('', Validators.required),
    complement: new FormControl('', Validators.required),
    profile_picture: new FormControl('', Validators.required),
    cover_picture: new FormControl('', Validators.required),
  });

  validation_messages = {
    company_description: [
      {type: 'required', message: 'Veuillez entrer la description de votre entreprise'},
      {type: 'maxlength', message: 'Veuillez entrer un texte de moins de 2000 caractères'}
    ],
    email: [
      {type: 'required', message: 'E-mail requis'},
      {type: 'email', message: 'Veuillez entrer un e-mail valide'}
    ],
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.userService.fetchProviderCompanyInfo().subscribe({
      next: value => {
        this.info = value
        // Fill the form with default values
        const form = this.updateInfoForm.value;
        form.company_name.setValue(value.company_name);
        form.company_description.setValue(value.company_description);
        form.email.setValue(value.email);
        form.area_served.setValue(value.area_served);
        form.number.setValue(value.address.number);
        form.street.setValue(value.address.street);
        form.city.setValue(value.address.city);
        form.postal_code.setValue(value.address.postal_code);
        form.complement.setValue(value.address.complement);
      }
    })
  }

  uploadProgress = 0; // Used for the upload progress bar
  uploadInProgress = false;
  uploadSuccess = false;
  updateInfo() {
    this.uploadInProgress = true;
    const values = this.updateInfoForm.value;
    this.userService.editProfileInfo({
      address: {
        number : values.number,
        street : values.street,
        city : values.city,
        postal_code : values.postal_code,
        complement : values.complement
      },
      area_served: values['area_served'],
      company_description: values['company_description'],
      company_name: values['company_name'],
      email: values['email'],
      cover_picture: undefined,
      profile_picture: undefined
    }).pipe( // Upload tracking from https://www.ahmedbouchefra.com/angular/angular-9-8-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
      map(event => { // React every time an event is emitted
        switch (event.type) {
          case HttpEventType.UploadProgress: // If it's an updata about the upload progress, update the upload bar and do nothing
            this.uploadProgress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response: // If it's a response, pass it to the next handler
            return event;
        }
      })
    ).subscribe({
      next : () => {
        this.uploadSuccess = true;
        this.uploadInProgress = false;
        setTimeout(() => this.uploadSuccess = false, 1000);
      },
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
}
