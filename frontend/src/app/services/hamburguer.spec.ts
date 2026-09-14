import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HamburguerService } from './hamburguer';

describe('HamburguerService', () => {
  let service: HamburguerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HamburguerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
