import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsDetailsComponent } from './repairs-details.component';

describe('RepairsDetailsComponent', () => {
  let component: RepairsDetailsComponent;
  let fixture: ComponentFixture<RepairsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
