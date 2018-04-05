import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LogInService } from '../../services/log-in.service';

@Component({
  selector: 'ng-e-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {
  user: User = {
    firstName: 'Ahsan',
    lastName: 'Ayaz'
  };
  isLoggedIn: boolean;
  constructor(private logInService: LogInService) { }

  ngOnInit() {
    this.logInService.cast.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  /**
   * @author Ahsan Ayaz
   * @desc Logs the user in
   */
  login() {
    this.logInService.logIn(true);
  }

  /**
   * @author Ahsan Ayaz
   * @desc Logs the user out
   */
  logout() {
    this.logInService.logOut(false);
  }
}
