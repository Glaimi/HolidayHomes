import { TestBed } from '@angular/core/testing';

import { KitchenTypeService } from './kitchen-type-service';

describe('KitchenTypeService', () => {
  let service: KitchenTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
