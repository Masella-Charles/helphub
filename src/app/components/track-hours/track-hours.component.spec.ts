import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackHoursComponent } from './track-hours.component';

describe('TrackHoursComponent', () => {
  let component: TrackHoursComponent;
  let fixture: ComponentFixture<TrackHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
