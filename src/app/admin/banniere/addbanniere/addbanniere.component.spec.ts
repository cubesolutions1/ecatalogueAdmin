import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbanniereComponent } from './addbanniere.component';

describe('AddbanniereComponent', () => {
  let component: AddbanniereComponent;
  let fixture: ComponentFixture<AddbanniereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbanniereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbanniereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
