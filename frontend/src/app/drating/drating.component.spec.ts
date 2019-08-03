import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DratingComponent } from './drating.component';

describe('DratingComponent', () => {
  let component: DratingComponent;
  let fixture: ComponentFixture<DratingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DratingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
