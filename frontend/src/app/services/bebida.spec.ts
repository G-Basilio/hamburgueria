import { TestBed } from '@angular/core/testing';
import { Bebida } from './bebida';

describe('Bebida', () => {
  let service: Bebida;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bebida);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
