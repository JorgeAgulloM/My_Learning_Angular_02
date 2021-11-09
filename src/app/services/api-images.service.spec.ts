import { TestBed } from '@angular/core/testing';

import { ApiImagesService } from './api-images.service';

describe('ApiImagesService', () => {
  let service: ApiImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
