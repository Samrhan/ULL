import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthPreventService {
  constructor(
    public router: Router
  ) { }

  canActivate(): boolean {
    if (localStorage.getItem('user-token') !== null) {
      this.router.navigate(['profile']);
      return false;
    }
    return true;
  }
}
