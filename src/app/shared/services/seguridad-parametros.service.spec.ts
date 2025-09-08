import { TestBed } from '@angular/core/testing';

import { SeguridadParametrosService } from './seguridad-parametros.service';

describe('SeguridadParametrosService', () => {
  let service: SeguridadParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguridadParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
