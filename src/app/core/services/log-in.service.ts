import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LogInService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  cast = this.isLoggedIn.asObservable();

  constructor() { }

  logIn(isLoggedIn) {
  	this.isLoggedIn.next(isLoggedIn);
  }

  logOut(isLoggedIn) {
  	this.isLoggedIn.next(isLoggedIn);
  }

}
