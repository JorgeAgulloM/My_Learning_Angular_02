import { TestBed } from '@angular/core/testing';

import { CommAPIService } from './comm-api.service';

describe('CommAPIService', () => {
  let service: CommAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
