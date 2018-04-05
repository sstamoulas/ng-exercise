import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService, Result } from '../../core/services/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

@Component({
  selector: 'ng-e-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  id: number;
  result: Result;

  constructor(private route: ActivatedRoute,
    		      private location: Location, 
              private dataService: DataService) { }

  ngOnInit() {
  	this.route.params
        .switchMap((params: Params) => { 
          	return Observable.of(this.dataService.serviceData[+params['id']]);
        })
        .subscribe(data => { 
          this.result = data; 
        });
  }

  goBack(): void {
    this.location.back();
  }
}
