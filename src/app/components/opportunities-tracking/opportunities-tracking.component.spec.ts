import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesTrackingComponent } from './opportunities-tracking.component';

describe('OpportunitiesTrackingComponent', () => {
  let component: OpportunitiesTrackingComponent;
  let fixture: ComponentFixture<OpportunitiesTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpportunitiesTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
