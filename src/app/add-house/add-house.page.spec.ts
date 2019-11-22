import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHousePage } from './add-house.page';

describe('AddHousePage', () => {
  let component: AddHousePage;
  let fixture: ComponentFixture<AddHousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHousePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
