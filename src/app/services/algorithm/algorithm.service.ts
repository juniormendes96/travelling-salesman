import { Path } from './../../models/path.model';
import { PathService } from './../path/path.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chromosome } from 'src/app/models/chromosome.model';
import shuffleArray from '../../utils/shuffleArray';

const INITIAL_POPULATION_NUMBER = 2;

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  constructor(private pathService: PathService) {}

  start(): Observable<Chromosome> {
    const paths = this.pathService.getPaths();
    const population = this.generateInitialPopulation(paths);

    return null;
  }

  private generateInitialPopulation(paths: Path[]): Chromosome[] {
    const chromosomes = [];
    for (let index = 0; index < INITIAL_POPULATION_NUMBER; index++) {
      chromosomes.push(this.createChromosome(paths));
    }

    return chromosomes;
  }

  private createChromosome(paths: Path[]): Chromosome {
    const cities = shuffleArray(
      paths.reduce(
        (pathList, currentPath) =>
          Array.from(new Set([...pathList, currentPath.originCity, currentPath.destinationCity])),
        []
      )
    );

    let totalDistance = 0;
    for (let index = 0; index < cities.length; index++) {
      if (index === cities.length - 1) {
        totalDistance += this.pathService.getDistanceBetween(cities[index], cities[0]);
      } else {
        totalDistance += this.pathService.getDistanceBetween(cities[index], cities[Number(index) + 1]);
      }
    }

    return { cities, totalDistance };
  }
}
