import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTraitePage } from './create-traite.page';

describe('CreateTraitePage', () => {
  let component: CreateTraitePage;
  let fixture: ComponentFixture<CreateTraitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTraitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTraitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
