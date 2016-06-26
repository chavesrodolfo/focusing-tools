import { FocusPage } from './app.po';

describe('focus App', function() {
  let page: FocusPage;

  beforeEach(() => {
    page = new FocusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
