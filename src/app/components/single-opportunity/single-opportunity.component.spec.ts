import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOpportunityComponent } from './single-opportunity.component';

describe('SingleOpportunityComponent', () => {
  let component: SingleOpportunityComponent;
  let fixture: ComponentFixture<SingleOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleOpportunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
