import { TestBed } from '@angular/core/testing';

import { PersonalPesnotService } from './personal-pesnot.service';

describe('PersonalPesnotService', () => {
  let service: PersonalPesnotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalPesnotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
