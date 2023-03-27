import { TestBed } from '@angular/core/testing';

import { AdminhauthService } from './adminhauth.service';

describe('AdminhauthService', () => {
  let service: AdminhauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminhauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
