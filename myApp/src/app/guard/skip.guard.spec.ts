import { TestBed } from '@angular/core/testing';

import { SkipGuard } from './skip.guard';

describe('SkipGuard', () => {
  let guard: SkipGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SkipGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
