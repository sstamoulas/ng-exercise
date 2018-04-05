import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DataService, Result } from '../../core/services/data.service';

@Component({
  selector: 'ng-e-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  results: Result[];

  constructor(private userService: UserService, 
              private dataService: DataService) { }

  ngOnInit() {
    if(this.dataService.serviceData == null) {
      this.userService.getUsers()
          .subscribe(
          data => { 
            this.results = data; 
            this.dataService.serviceData = data; 
          });
    }
    else{
      this.results = this.dataService.serviceData;
    }
  }

}
