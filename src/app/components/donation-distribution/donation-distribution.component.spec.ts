import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDistributionComponent } from './donation-distribution.component';

describe('DonationDistributionComponent', () => {
  let component: DonationDistributionComponent;
  let fixture: ComponentFixture<DonationDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonationDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
