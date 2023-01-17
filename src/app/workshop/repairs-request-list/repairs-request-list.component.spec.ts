import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsRequestListComponent } from './repairs-request-list.component';

describe('RepairsRequestListComponent', () => {
  let component: RepairsRequestListComponent;
  let fixture: ComponentFixture<RepairsRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
