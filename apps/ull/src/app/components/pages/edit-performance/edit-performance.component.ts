import { Component, OnInit } from '@angular/core';
import {ProviderProfile} from "@ull/api-interfaces";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'ull-edit-performance',
  templateUrl: './edit-performance.component.html',
  styleUrls: ['./edit-performance.component.scss'],
})
export class EditPerformanceComponent implements OnInit {
  profile : ProviderProfile | undefined;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.fetchProviderProfile().subscribe({
      next: value => this.profile = value
    });
  }
}
