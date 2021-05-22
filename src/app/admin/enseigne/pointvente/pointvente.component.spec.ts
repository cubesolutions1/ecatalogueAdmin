/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PointventeComponent } from './pointvente.component';

describe('PointventeComponent', () => {
  let component: PointventeComponent;
  let fixture: ComponentFixture<PointventeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointventeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
