import { TestBed } from '@angular/core/testing';

import { MedicolApiService } from './medicol-api.service';

describe('MedicolApiService', () => {
  let service: MedicolApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicolApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
