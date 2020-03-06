import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTolistPage } from './add-tolist.page';

describe('AddTolistPage', () => {
  let component: AddTolistPage;
  let fixture: ComponentFixture<AddTolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTolistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
