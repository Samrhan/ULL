import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {RouterTestingModule} from "@angular/router/testing";
import {AccueilComponent} from "../../components/pages/accueil/accueil.component";
import {Router} from "@angular/router";

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: AccueilComponent},
          { path: 'login', component: AccueilComponent}
        ])
      ]
    });
    service = TestBed.inject(AuthGuardService);

    router = TestBed.get(Router);

    localStorage.clear();
  });

  afterAll(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if there is nothing in local storage', () => {
    expect(service.canActivate()).toBeFalsy();
  })

  it('should navigate to /login if there is nothing in local storage', () => {
    const spyNavigate = jest.spyOn(router, 'navigate');
    service.canActivate();

    expect(spyNavigate).toHaveBeenCalledWith(["login"]);
  })

  it('should return false if there is a token in local storage', () => {
    localStorage.setItem('user-token', 'XXX');
    expect(service.canActivate()).toBeTruthy();
  })

  it('should NOT navigate if there is a token in local storage', () => {
    localStorage.setItem('user-token', 'XXX');
    const spyNavigate = jest.spyOn(router, 'navigate');
    service.canActivate();

    expect(spyNavigate).not.toHaveBeenCalled();
  })
});
