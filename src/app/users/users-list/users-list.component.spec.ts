import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../core/services/user.service';
import { DataService, Result } from '../../core/services/data.service';
import { UsersListComponent } from './users-list.component';
import { baseURL } from '../../core/config/baseurl';
import { Observable } from 'rxjs/Observable';
import { RESULTS } from '../../core/test/testData';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let userServiceStub = {
    getUsers: function(): Observable<Result[]> {
      return Observable.of(RESULTS);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'users-list', component: UsersListComponent }
        ])
      ],
      declarations: [ UsersListComponent ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: 'BaseURL', useValue: baseURL },
        { provide: DataService, useValue: DataService }
      ]
    })
    .compileComponents();

    let userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 20 users', () => {
    expect(component.results.length).toBe(20);
    expect(component.results[0].name.first).toBe('felicia');
    expect(component.results[0].name.last).toBe('garcia');
    expect(component.results[0].phone).toBe('(378)-488-8457');
  });

  it('should be in proper format', () => {
    fixture.detectChanges();

    let de: DebugElement;
    let el: HTMLElement;

    de = fixture.debugElement.query(By.css('li .name'));
    el = de.nativeElement;

    expect(el.textContent).toContain("Name: " + RESULTS[0].name.first + " " + RESULTS[0].name.last);

    de = fixture.debugElement.query(By.css('li .email'));
    el = de.nativeElement;

    expect(el.textContent).toContain("Email: " + RESULTS[0].email);

    de = fixture.debugElement.query(By.css('li .phone'));
    el = de.nativeElement;

    expect(el.textContent).toContain("Phone: " + RESULTS[0].phone);
  });
});
