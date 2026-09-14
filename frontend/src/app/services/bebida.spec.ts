import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BebidaService } from './bebida';

describe('BebidaService', () => {
  let service: BebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
