import { TestBed } from '@angular/core/testing';

import { FilterHistoryService } from './filter-history.service';

describe('FilterHistoryService', () => {
  let service: FilterHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
