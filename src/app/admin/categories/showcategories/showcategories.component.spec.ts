import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcategoriesComponent } from './showcategories.component';

describe('ShowcategoriesComponent', () => {
  let component: ShowcategoriesComponent;
  let fixture: ComponentFixture<ShowcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
