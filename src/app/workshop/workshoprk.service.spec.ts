import { TestBed } from '@angular/core/testing';

import { WorkshoprkService } from './workshoprk.service';

describe('WorkshoprkService', () => {
  let service: WorkshoprkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshoprkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
