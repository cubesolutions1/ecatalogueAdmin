import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbanniereComponent } from './showbanniere.component';

describe('ShowbanniereComponent', () => {
  let component: ShowbanniereComponent;
  let fixture: ComponentFixture<ShowbanniereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowbanniereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowbanniereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
