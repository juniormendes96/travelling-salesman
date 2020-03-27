import { TestBed } from '@angular/core/testing';

import { PathService } from './path.service';

describe('PathService', () => {
  let service: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathService]
    });

    service = TestBed.get(PathService);
    service.setPaths([
      { originCity: 'Vancouver', destinationCity: 'Ottawa', distance: 300 },
      { originCity: 'Florida', destinationCity: 'Los Angeles', distance: 500 },
      { originCity: 'London', destinationCity: 'Manchester', distance: 200 }
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the paths', () => {
    expect(service.getPaths().length).toBe(3);
  });

  it('should get the distance between two cities', () => {
    expect(service.getDistanceBetween('Vancouver', 'Ottawa')).toBe(300);
    expect(service.getDistanceBetween('Ottawa', 'Vancouver')).toBe(300);
  });

  it('should throw an error when the city is not on the list', () => {
    expect(() => service.getDistanceBetween('Any city', 'Ottawa')).toThrowError();
    expect(() => service.getDistanceBetween('Ottawa', 'Any city')).toThrowError();
  });
});
