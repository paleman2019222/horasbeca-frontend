import { TestBed } from '@angular/core/testing';

import { RestActivityService } from './rest-activity.service';

describe('RestActivityService', () => {
  let service: RestActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
