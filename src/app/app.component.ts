import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { AlgorithmService } from './services/algorithm/algorithm.service';
import { PathService } from './services/path/path.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Path } from './models/path.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('cityInputElement', { static: false }) cityInputElement: ElementRef;
  cityInput: string;
  generationsInput: number;

  cities: string[] = ['Vancouver', 'Toronto', 'Hamilton'];
  paths: Path[] = [
    {
      originCity: this.cities[0],
      destinationCity: this.cities[1],
      distance: 800
    },
    {
      originCity: this.cities[0],
      destinationCity: this.cities[2],
      distance: 100
    },
    {
      originCity: this.cities[1],
      destinationCity: this.cities[2],
      distance: 1500
    }
  ];

  cityInputVisible = false;
  isCalculating = false;

  constructor(
    private pathService: PathService,
    private algorithmService: AlgorithmService,
    private notificationService: NzNotificationService,
    private modalService: NzModalService
  ) {}

  showCityInput(): void {
    this.cityInputVisible = true;
    setTimeout(() => {
      this.cityInputElement.nativeElement.focus();
    }, 10);
  }

  handleCityInputConfirm(): void {
    if (this.cityInput && this.cities.indexOf(this.cityInput) === -1) {
      this.cities = [...this.cities, this.cityInput];
      this.buildPaths();
    }
    this.cityInput = '';
    this.cityInputVisible = false;
  }

  removeCity(city) {
    this.cities = this.cities.filter(c => c !== city);
    this.buildPaths();
  }

  calculate() {
    if (!this.generationsInput) {
      this.notificationService.create('error', 'Error', 'You need to enter the number of generations.');
      return;
    }

    if (this.cities.length < 3 || this.cities.length > 10) {
      this.notificationService.create('error', 'Error', 'Please select between 3 and 10 cities.');
      return;
    }

    this.pathService.setPaths(this.paths);
    this.algorithmService
      .start(this.generationsInput)
      .pipe(tap(() => (this.isCalculating = true)))
      .subscribe(fittest => {
        let displayCities = [...fittest.cities];
        displayCities.push(this.cities[0]);
        this.modalService.success({
          nzTitle: 'Results',
          nzContent: `
            <p>Best path: <strong>${displayCities.join(' -> ')}</strong></p>
            <p>Total distance: <strong>${fittest.totalDistance}</strong></p>
            <p>Number of generations: <strong>${this.generationsInput}</strong></p>
          `
        });
        this.isCalculating = false;
      });
  }

  private buildPaths() {
    const newPaths = [];

    for (let i = 0; i < this.cities.length; i++) {
      for (let j = 0; j < this.cities.length; j++) {
        if (i === j) continue;

        const pathInOldList = this.pathService.findPath(this.cities[i], this.cities[j], this.paths);
        const pathInNewList = this.pathService.findPath(this.cities[i], this.cities[j], newPaths);

        if (!pathInNewList) {
          newPaths.push(
            pathInOldList ||
              ({
                originCity: this.cities[i],
                destinationCity: this.cities[j],
                distance: 0
              } as Path)
          );
        }
      }
    }

    this.paths = newPaths;
  }
}
