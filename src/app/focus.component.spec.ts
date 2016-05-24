import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { FocusAppComponent } from '../app/focus.component';

beforeEachProviders(() => [FocusAppComponent]);

describe('App: Focus', () => {
  it('should create the app',
      inject([FocusAppComponent], (app: FocusAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'focus works!\'',
      inject([FocusAppComponent], (app: FocusAppComponent) => {
    expect(app.title).toEqual('focus works!');
  }));
});
