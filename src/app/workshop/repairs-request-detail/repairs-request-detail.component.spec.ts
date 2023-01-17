import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsRequestDetailComponent } from './repairs-request-detail.component';

describe('RepairsRequestDetailComponent', () => {
  let component: RepairsRequestDetailComponent;
  let fixture: ComponentFixture<RepairsRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsRequestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
