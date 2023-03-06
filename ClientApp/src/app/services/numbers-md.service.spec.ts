import { TestBed } from '@angular/core/testing';

import { NumbersMDService } from './numbers-md.service';

describe('NumbersMDService', () => {
  let service: NumbersMDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumbersMDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
