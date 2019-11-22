import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSelectPage } from './house-select.page';

describe('HouseSelectPage', () => {
  let component: HouseSelectPage;
  let fixture: ComponentFixture<HouseSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
