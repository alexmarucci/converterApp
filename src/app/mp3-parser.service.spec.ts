import { TestBed, inject } from '@angular/core/testing';

import { Mp3ParserService } from './mp3-parser.service';

describe('Mp3ParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Mp3ParserService]
    });
  });

  it('should be created', inject([Mp3ParserService], (service: Mp3ParserService) => {
    expect(service).toBeTruthy();
  }));
});
