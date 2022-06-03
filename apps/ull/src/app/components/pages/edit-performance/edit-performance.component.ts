import { Component, OnInit } from '@angular/core';
import {Performance, ProviderProfile, ProviderProfileSection} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from '../../../../environments/environment';
import {faCamera} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ull-edit-performance',
  templateUrl: './edit-performance.component.html',
  styleUrls: ['./edit-performance.component.scss'],
})
export class EditPerformanceComponent implements OnInit {
  profile : ProviderProfile | undefined;
  performance : Performance | undefined;

  environment = environment;
  faCamera = faCamera;

  updatePerformanceForm: FormGroup = this.formBuilder.group({
    performance_title: new FormControl('', Validators.required),
    performance_description: new FormControl('', Validators.maxLength(2000)),
    performance_price_value: new FormControl('', Validators.compose([ // Price handled in float format in interface, and cast to cents for API call
      Validators.required,
      Validators.min(0),
      Validators.max(100000) // Max performance price : 100 000€
    ])),
    performance_price_unit: new FormControl('', Validators.required),
  });

  pictureUrl = "";
  newPicture : File | undefined;

  priceUnitTranslation = [
    {type: "absolute", text: 'Prix fixe'},
    {type: "person", text: 'Prix par participant'},
    {type: "stack", text: 'Prix par unité'},
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
        this.profile = value

        try {
          this.performance = value.services
            .filter((value : ProviderProfileSection) => value.id_section === this.route.snapshot.params['idSection'])[0]
            .content
            .filter((value : Performance) => value.id_performance === this.route.snapshot.params['idPerformance'])[0]
        } catch (_) {
          this.router.navigateByUrl('/profile');
        }

        if(this.performance){
          this.updatePerformanceForm.get("performance_title")?.setValue(this.performance.performance_title);
          this.updatePerformanceForm.get("performance_description")?.setValue(this.performance.performance_description);
          this.updatePerformanceForm.get("performance_price_value")?.setValue(this.performance.price.value / 100);
          this.updatePerformanceForm.get("performance_price_unit")?.setValue(this.performance.price.unit);

          this.pictureUrl = environment.providerPicturesURL + this.performance.picture;
        }
      }
    });
  }

  /**
   * Returns "true" if the given control is valid, false if it is invalid or doesn't exist
   * @param name
   */
  validInput(name: string) {
    const control: AbstractControl | null = this.updatePerformanceForm.get(name);
    if (control){
      return !(control.invalid && (control.dirty || control.touched))
    } else {
      return false;
    }
  }

  onPictureSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.newPicture = target.files[0];
      this.replaceDefaultPictureUrl(this.newPicture)
    } else {
      this.newPicture = undefined;
      this.pictureUrl = environment.providerPicturesURL + this.performance?.picture || '';
    }
  }

  replaceDefaultPictureUrl(file: File){
    const reader = new FileReader();
    reader.onloadend = () => {this.pictureUrl = (reader.result as string)};
    reader.readAsDataURL(file);
  }

  uploadProgress  = 0;
  uploadInProgress  = false;
  saveChanges() {
    this.uploadInProgress = true;
    const values = this.updatePerformanceForm.value;

    if (this.performance){
      this.userService.editPerformance({
        performance_description: values.performance_description,
        performance_id: this.performance.id_performance,
        performance_picture: this.newPicture,
        performance_title: values.performance_title,
        price_unit: values.performance_price_unit,
        price_value: Math.floor(values.performance_price_value * 100)
      }).subscribe({
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
  }
}
