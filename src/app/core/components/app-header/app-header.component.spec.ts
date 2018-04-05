import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppContentComponent } from '../app-content/app-content.component';
import { AppHeaderComponent } from './app-header.component';
import { User } from '../../models/user.model';
import { LogInService } from '../../services/log-in.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let de: DebugElement;

  class MockLogInService {
    isLoggedIn = new BehaviorSubject<boolean>(false);
    user = { firstName: 'Test', lastName: 'User'};
    cast = this.isLoggedIn.asObservable();

    logIn(isLoggedIn) {
      this.isLoggedIn.next(isLoggedIn);
    }

    logOut(isLoggedIn) {
      this.isLoggedIn.next(isLoggedIn);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'app-header', component: AppHeaderComponent }
        ])
      ],
      declarations: [ 
        AppHeaderComponent,
        AppContentComponent 
      ],
      providers: [
        { provide: LogInService, useClass: MockLogInService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be logged in on entry', () => {
    fixture.detectChanges();

    let el: HTMLElement;

    de = fixture.debugElement.query(By.css('.login-btn'));
    el = de.nativeElement;

    expect(component.isLoggedIn).toBe(false);
    expect(el.textContent).toContain("Login");

    de = fixture.debugElement.query(By.css('.initials'));

    expect(de).toEqual(null);
  });

  it('should be able to log in', fakeAsync(() => {    
    de.query(By.css('.login-btn'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      tick(2000);
      fixture.detectChanges();

      const value = de.query(By.css('.initials')).nativeElement.innerText;

      expect(component.isLoggedIn).toBe(true);
      expect(value).toEqual('AA');
    });
  }));

  it('should be able to log out after loggin in', fakeAsync(() => {   
    de.query(By.css('.login-btn'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      tick(2000);
      fixture.detectChanges();

      de.query(By.css('.logout-btn'))
        .triggerEventHandler('click', null);

      fixture.whenStable().then(() => {
        tick(2000);
        fixture.detectChanges();

        const value = de.query(By.css('.initials'));

        expect(component.isLoggedIn).toBe(false);
        expect(value).toBe(null);
      });
    });
  }));

  it('should contain app-content component', fakeAsync(() => {  
    const fixtureContent = TestBed.createComponent(AppContentComponent);
    fixtureContent.detectChanges();
    let deContent = fixtureContent.debugElement;

    const htmlElement = deContent.query(By.css('.app-content')).nativeElement;

    expect(htmlElement).not.toBe(null);
  }));

  it('should affect app-content component when logged in from app-header', fakeAsync(() => {  
    const fixtureContent = TestBed.createComponent(AppContentComponent);
    const componentContent = fixtureContent.componentInstance;
    let deContent = fixtureContent.debugElement;
    de.query(By.css('.app-btn'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      tick(2000);
      fixture.detectChanges();
      fixtureContent.detectChanges();

      const value = deContent.query(By.css('.app-btn')).nativeElement;

      expect(componentContent.isLoggedIn).toBe(true);
      expect(value.textContent).toBe("Logout");
    });
  }));
});
