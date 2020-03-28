import { Path } from './../../models/path.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  private paths: Path[];

  constructor() {}

  getPaths(): Path[] {
    return this.paths;
  }

  setPaths([...paths]): void {
    this.paths = paths;
  }

  getDistanceBetween(cityA: string, cityB: string): number {
    const path = this.findPath(cityA, cityB);
    if (!path) {
      throw new Error('Path not found.');
    }

    return path.distance;
  }

  findPath(cityA: string, cityB: string, paths = this.paths): Path {
    const path = paths.find(path => {
      return (
        (path.originCity === cityA && path.destinationCity === cityB) ||
        (path.originCity === cityB && path.destinationCity === cityA)
      );
    });

    return path;
  }
}
