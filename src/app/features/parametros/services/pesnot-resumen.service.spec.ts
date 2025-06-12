import { TestBed } from '@angular/core/testing';

import { PesnotResumenService } from './pesnot-resumen.service';

describe('PesnotResumenService', () => {
  let service: PesnotResumenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesnotResumenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
