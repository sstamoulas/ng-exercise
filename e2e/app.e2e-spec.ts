import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('ng-exercise App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('/landing');
    expect(page.getParagraphText('.heading')).toEqual('Angular Exercise - Modus Recruiting');
  });

  it('should navigate to users page by clicking on the button', () => {
    page.navigateTo('/landing');
  	let navLink = page.getAllElements('button').get(0);
  	navLink.click();

  	expect(page.getParagraphText('h1')).toBe('List of Users');
  });

  it('should navigate to user details page by clicking any of the links', () => {
    page.navigateTo('/#/users');

  	let navLink = page.getAllElements('a').get(1);
  	navLink.click();

  	expect(page.getParagraphText('h1')).toBe('User Details');
  });

  it('should navigate back to list of users page by clicking the back button', () => {
    page.navigateTo('/#/users');

    let navLink = page.getAllElements('a').get(1);
  	navLink.click();

  	let navLink = page.getElement('.back-btn');
  	navLink.click();

  	expect(page.getParagraphText('h1')).toBe('List of Users');
  });

  it('should navigate to the home page', () => {
    page.navigateTo('/#/home');

  	expect(page.getParagraphText('.action-btn > .app-btn')).toBe('Login');
  });

  it('should log user in after login button click', () => {
    page.navigateTo('/#/home');
  	let btn = page.getElement('.action-btn .app-btn');
  	btn.click();

  	expect(page.getParagraphText('.user-profile')).toBe('Hey Ahsan Ayaz! Good day ahead!');
  	expect(page.getParagraphText('.action-btn .app-btn')).toBe('Logout');
  });

  it('should sync with top level nav once content button is clicked', () => {
    page.navigateTo('/#/home');
  	let btn = page.getElement('.action-btn .app-btn');
  	btn.click();

  	expect(page.getParagraphText('.initials')).toBe('AA');
  	expect(page.getParagraphText('.action-btns .logout-btn')).toBe('Logout');
  });

  it('should sync with lower level button once button nav is clicked', () => {
    page.navigateTo('/#/home');
  	let navLink = page.getElement('.action-btns .login-btn');
  	navLink.click();

	expect(page.getParagraphText('.initials')).toBe('AA');
  	expect(page.getParagraphText('.action-btn .app-btn')).toBe('Logout');
  });
});
