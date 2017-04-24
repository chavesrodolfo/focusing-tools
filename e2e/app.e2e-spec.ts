import { NgTomatoPage } from './app.po';

describe('ng-tomato App', () => {
  let page: NgTomatoPage;

  beforeEach(() => {
    page = new NgTomatoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
