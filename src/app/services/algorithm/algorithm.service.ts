import { Chromosome } from './../../models/chromosome.model';
import { Path } from './../../models/path.model';
import { PathService } from './../path/path.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import shuffleArray from '../../utils/shuffleArray';
import generateRandomIndex from '../../utils/generateRandomIndex';

const POPULATION_NUMBER = 2;
const NUMBER_OF_GENERATIONS = 100;

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  constructor(private pathService: PathService) {}

  start(): Observable<Chromosome> {
    return new Observable(observer => {
      const paths = this.pathService.getPaths();
      const population = this.generateInitialPopulation(paths);
      for (let index = 0; index < NUMBER_OF_GENERATIONS; index++) {
        const lessFit = this.selectLessFit(population);
        this.mutate(lessFit);
      }

      observer.next(this.selectFittest(population));
    });
  }

  private generateInitialPopulation(paths: Path[]): Chromosome[] {
    const chromosomes = [];
    for (let index = 0; index < POPULATION_NUMBER; index++) {
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

    return { cities, totalDistance: this.calculateTotalDistance(cities) };
  }

  private selectLessFit(population: Chromosome[]): Chromosome {
    return population.reduce(
      (lessFit, currentChromosome) =>
        currentChromosome.totalDistance > lessFit.totalDistance ? currentChromosome : lessFit,
      population[0]
    );
  }

  private selectFittest(population: Chromosome[]): Chromosome {
    return population.reduce(
      (fittest, currentChromosome) =>
        currentChromosome.totalDistance < fittest.totalDistance ? currentChromosome : fittest,
      population[0]
    );
  }

  private mutate(chromosome: Chromosome): void {
    const randomIndexA = generateRandomIndex(chromosome.cities.length);
    const randomIndexB = generateRandomIndex(chromosome.cities.length);

    const temp = chromosome.cities[randomIndexA];
    chromosome.cities[randomIndexA] = chromosome.cities[randomIndexB];
    chromosome.cities[randomIndexB] = temp;
    chromosome.totalDistance = this.calculateTotalDistance(chromosome.cities);
  }

  private calculateTotalDistance(cities: string[]): number {
    let totalDistance = 0;
    for (let index = 0; index < cities.length; index++) {
      if (index === cities.length - 1) {
        totalDistance += this.pathService.getDistanceBetween(cities[index], cities[0]);
      } else {
        totalDistance += this.pathService.getDistanceBetween(cities[index], cities[Number(index) + 1]);
      }
    }

    return totalDistance;
  }
}
