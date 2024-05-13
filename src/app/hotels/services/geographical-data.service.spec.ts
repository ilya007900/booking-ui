import { TestBed } from '@angular/core/testing';

import { GeographicalDataService } from './geographical-data.service';

describe('GeographicalDataService', () => {
  let service: GeographicalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographicalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
