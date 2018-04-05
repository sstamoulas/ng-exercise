import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppContentComponent } from './app-content.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { User } from '../../models/user.model';
import { LogInService } from '../../services/log-in.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('AppContentComponent', () => {
  let component: AppContentComponent;
  let fixture: ComponentFixture<AppContentComponent>;
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
          { path: 'app-content', component: AppContentComponent }
        ])
      ],
      declarations: [ 
        AppContentComponent, 
        AppHeaderComponent 
      ],
      providers: [
        { provide: LogInService, useClass: MockLogInService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContentComponent);
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

    de = fixture.debugElement.query(By.css('.app-btn'));
    el = de.nativeElement;

    expect(component.isLoggedIn).toBe(false);
    expect(el.textContent).toContain("Login");

    de = fixture.debugElement.query(By.css('.user-profile'));

    expect(de).toEqual(null);
  });

  it('should be able to log in', fakeAsync(() => {    
    de.query(By.css('.app-btn'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      tick(2000);
      fixture.detectChanges();

      const value = de.query(By.css('div .user-profile')).nativeElement.innerText;

      expect(component.isLoggedIn).toBe(true);
      expect(value).toEqual('Hey Ahsan Ayaz! Good day ahead!');
    });
  }));

  it('should be able to log out after loggin in', fakeAsync(() => {   
    de.query(By.css('.app-btn'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      tick(2000);
      fixture.detectChanges();

      de.query(By.css('.app-btn'))
        .triggerEventHandler('click', null);

      fixture.whenStable().then(() => {
        tick(2000);
        fixture.detectChanges();

        const value = de.query(By.css('div .user-profile'));

        expect(component.isLoggedIn).toBe(false);
        expect(value).toBe(null);
      });
    });
  }));

  it('should contain app-header component', fakeAsync(() => {  
    const fixtureHeader = TestBed.createComponent(AppHeaderComponent);
    fixtureHeader.detectChanges();
    let deHeader = fixtureHeader.debugElement;

    const htmlElement = deHeader.query(By.css('.app-header')).nativeElement;

    expect(htmlElement).not.toBe(null);
  }));

  it('should affect app-header component when logged in from app-content', fakeAsync(() => {  
    const fixtureHeader = TestBed.createComponent(AppHeaderComponent);
    const componentHeader = fixtureHeader.componentInstance;
    let deHeader = fixtureHeader.debugElement;
    de.query(By.css('.app-btn'))
      .triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      tick(2000);
      fixture.detectChanges();
      fixtureHeader.detectChanges();

      const value = deHeader.query(By.css('.logout-btn')).nativeElement;

      expect(componentHeader.isLoggedIn).toBe(true);
      expect(value.textContent).toBe("Logout");
    });
  }));
});
