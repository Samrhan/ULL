import { TestBed } from '@angular/core/testing';

import { AuthPreventService } from './auth-prevent.service';
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../../components/pages/accueil/accueil.component";

describe('AuthPreventService', () => {
  let service: AuthPreventService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'profile', component: AccueilComponent}
        ])
      ]
    });
    service = TestBed.inject(AuthPreventService);

    router = TestBed.get(Router);
  });

  afterAll(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if there is nothing in local storage', () => {
    expect(service.canActivate()).toBeTruthy();
  })

  it('should NOT navigate if there is nothing in local storage', () => {
    const spyNavigate = jest.spyOn(router, 'navigate');
    service.canActivate();

    expect(spyNavigate).not.toHaveBeenCalled();
  })

  it('should navigate to /profile if there is a token in local storage', () => {
    localStorage.setItem('user-token', 'XXX');
    const spyNavigate = jest.spyOn(router, 'navigate');
    service.canActivate();

    expect(spyNavigate).toHaveBeenCalledWith(["profile"]);
  })

  it('should return true if there is a token in local storage', () => {
    localStorage.setItem('user-token', 'XXX');
    expect(service.canActivate()).toBeFalsy();
  })
});
