import { TestBed } from '@angular/core/testing';

import { GestionNotariasServiceService } from './gestion-notarias-service.service';

describe('GestionNotariasServiceService', () => {
  let service: GestionNotariasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionNotariasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
