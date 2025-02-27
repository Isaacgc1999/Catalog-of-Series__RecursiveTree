import { TestBed } from '@angular/core/testing';

import { FilterCatalogueService } from './filter-catalogue.service';

describe('FilterCatalogueService', () => {
  let service: FilterCatalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterCatalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
