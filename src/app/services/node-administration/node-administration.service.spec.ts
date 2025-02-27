import { TestBed } from '@angular/core/testing';

import { NodeAdministrationService } from './node-administration.service';

describe('NodeAdministrationService', () => {
  let service: NodeAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
