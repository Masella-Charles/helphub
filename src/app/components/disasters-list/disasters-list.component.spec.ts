import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisastersListComponent } from './disasters-list.component';

describe('DisastersListComponent', () => {
  let component: DisastersListComponent;
  let fixture: ComponentFixture<DisastersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisastersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisastersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
