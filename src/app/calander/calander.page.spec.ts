import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderPage } from './calander.page';

describe('CalanderPage', () => {
  let component: CalanderPage;
  let fixture: ComponentFixture<CalanderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalanderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalanderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
