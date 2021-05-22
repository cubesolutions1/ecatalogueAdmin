import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcommercantComponent } from './showcommercant.component';

describe('ShowcommercantComponent', () => {
  let component: ShowcommercantComponent;
  let fixture: ComponentFixture<ShowcommercantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcommercantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
