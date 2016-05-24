export class FocusPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('focus-app h1')).getText();
  }
}
