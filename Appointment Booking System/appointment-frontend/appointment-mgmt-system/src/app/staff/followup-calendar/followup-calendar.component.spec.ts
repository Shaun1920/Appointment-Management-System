import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupCalendarComponent } from './followup-calendar.component';

describe('FollowupCalendarComponent', () => {
  let component: FollowupCalendarComponent;
  let fixture: ComponentFixture<FollowupCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
