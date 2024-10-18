import { TestBed } from '@angular/core/testing';

import { AccessService } from './access.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccessService', () => {
  let service: AccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
