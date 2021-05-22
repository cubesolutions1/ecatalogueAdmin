import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcatalogueComponent } from './showcatalogue.component';

describe('ShowcatalogueComponent', () => {
  let component: ShowcatalogueComponent;
  let fixture: ComponentFixture<ShowcatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
