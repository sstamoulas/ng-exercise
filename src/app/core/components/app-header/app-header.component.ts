import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LogInService } from '../../services/log-in.service';

@Component({
  selector: 'ng-e-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
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
   * @desc Logs the user in
   */
  signup() {
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
