import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesPostingComponent } from './opportunities-posting.component';

describe('OpportunitiesPostingComponent', () => {
  let component: OpportunitiesPostingComponent;
  let fixture: ComponentFixture<OpportunitiesPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpportunitiesPostingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
