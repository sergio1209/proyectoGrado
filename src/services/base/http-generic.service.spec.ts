import { TestBed } from '@angular/core/testing';

import { HttpGenericService } from './http-generic.service';
import {User} from "../../models/user.interface";

describe('HttpGenericService', () => {
  let service: HttpGenericService<User>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
