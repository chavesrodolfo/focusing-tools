import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FocusUserImageComponent } from './focus-user-image.component';

describe('Component: FocusUserImage', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [FocusUserImageComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([FocusUserImageComponent],
      (component: FocusUserImageComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(FocusUserImageComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(FocusUserImageComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-focus-user-image></app-focus-user-image>
  `,
  directives: [FocusUserImageComponent]
})
class FocusUserImageComponentTestController {
}

