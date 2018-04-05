import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService, Result } from '../../core/services/data.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { RESULTS } from '../../core/test/testData';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let resultMock: Result;
  let locationSpy: any;
  let dataServiceStub = {
    getUser: function(id: number): Observable<Result> {
      return Observable.of(RESULTS[id]);
    }
  };

  let routerMock = {
      navigate: jasmine.createSpy('navigate')
  };

  let locationMock = {
      back: jasmine.createSpy('back')
  };

  let mockRoute: any = { snapshot: {}};

  mockRoute.parent = { params: new Subject<any>()};
  mockRoute.params = new Subject<any>();
  mockRoute.queryParams = new Subject<any>();

  beforeEach(async(() => {    
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ UserDetailComponent ],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: DataService, useValue: dataServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    locationSpy = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the users list page', () => {
      component.goBack();
      fixture.whenStable()
          .then(() => expect(locationSpy.back).toHaveBeenCalled());
  });
});
