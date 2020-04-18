import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input()
  public title: string;

  @Input()
  public includeBackButton: boolean;

  @Input()
  public backButtonCommands: string[];

  constructor(public authenticationService: AuthenticationService) { }

  public logout(): void {
    this.authenticationService.logout();
  }
}
