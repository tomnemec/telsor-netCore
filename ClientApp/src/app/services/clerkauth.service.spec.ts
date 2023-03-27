import { TestBed } from '@angular/core/testing';

import { ClerkauthService } from './clerkauth.service';

describe('ClerkauthService', () => {
  let service: ClerkauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClerkauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
