import { TestBed } from '@angular/core/testing';

import { GestionNotariasService } from './gestion-notarias.service';

describe('GestionNotariasService', () => {
  let service: GestionNotariasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionNotariasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
