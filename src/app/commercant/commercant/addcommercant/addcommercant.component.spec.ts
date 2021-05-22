import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommercantComponent } from './addcommercant.component';

describe('AddcommercantComponent', () => {
  let component: AddcommercantComponent;
  let fixture: ComponentFixture<AddcommercantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcommercantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
