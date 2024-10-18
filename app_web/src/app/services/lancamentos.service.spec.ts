import { TestBed } from '@angular/core/testing';

import { LancamentosService } from './lancamentos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LancamentosService', () => {
  let service: LancamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LancamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
