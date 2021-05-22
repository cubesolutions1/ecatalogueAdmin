import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcatalogueComponent } from './addcatalogue.component';

describe('AddcatalogueComponent', () => {
  let component: AddcatalogueComponent;
  let fixture: ComponentFixture<AddcatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
