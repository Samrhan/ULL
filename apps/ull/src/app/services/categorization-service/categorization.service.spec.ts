import { TestBed } from '@angular/core/testing';

import { CategorizationService } from './categorization.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../../components/pages/accueil/accueil.component";

describe('CategorizationService', () => {
  let service: CategorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ])
      ]
    });
    service = TestBed.inject(CategorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
