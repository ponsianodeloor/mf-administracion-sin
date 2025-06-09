import { TestBed } from '@angular/core/testing';

import { NotariasPesnotService } from './notarias-pesnot.service';

describe('NotariasPesnotService', () => {
  let service: NotariasPesnotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotariasPesnotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
