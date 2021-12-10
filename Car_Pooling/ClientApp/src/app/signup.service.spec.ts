import { TestBed } from '@angular/core/testing';

import {SignUpService} from './general.service'

describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignUpService = TestBed.get(SignUpService);
    expect(service).toBeTruthy();
  });
});
