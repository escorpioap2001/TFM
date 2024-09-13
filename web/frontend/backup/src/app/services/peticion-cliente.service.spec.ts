import { TestBed } from '@angular/core/testing';

import { PeticionClienteService } from './peticion-cliente.service';

describe('PeticionClienteService', () => {
  let service: PeticionClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
