import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { AlgorithmService } from './services/algorithm/algorithm.service';
import { PathService } from './services/path/path.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Path } from './models/path.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('cityInputElement', { static: false }) cityInputElement: ElementRef;

  cityInput: string;
  generationsInput: number;
  cityInputVisible = false;

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
      this.addCityToPathList(this.cityInput);
    }
    this.cityInput = '';
    this.cityInputVisible = false;
  }

  removeCity(city: string): void {
    this.cities = this.cities.filter(c => c !== city);
    this.paths = this.paths.filter(path => path.originCity !== city && path.destinationCity !== city);
  }

  calculate(): void {
    if (this.isReadyToCalculate()) {
      this.pathService.setPaths(this.paths);
      this.algorithmService
        .start(this.generationsInput)
        .pipe(take(1))
        .subscribe(fittest => {
          const citiesResult = [...fittest.cities];
          citiesResult.push(fittest.cities[0]);

          this.modalService.success({
            nzTitle: 'Results',
            nzWidth: 750,
            nzContent: `
              <p>Best path: <strong>${citiesResult.join(' -> ')}</strong></p>
              <p>Total distance: <strong>${fittest.totalDistance}</strong></p>
              <p>Number of generations: <strong>${this.generationsInput}</strong></p>
            `
          });
        });
    }
  }

  private isReadyToCalculate() {
    if (!this.generationsInput) {
      this.notificationService.create('error', 'Error', 'You need to enter the number of generations.');
      return false;
    }

    if (this.cities.length < 3 || this.cities.length > 10) {
      this.notificationService.create('error', 'Error', 'Please select between 3 and 10 cities.');
      return false;
    }

    return true;
  }

  private addCityToPathList(city: string): void {
    if (!this.paths.length && this.cities.length === 2) {
      this.paths = [
        {
          originCity: this.cities[0],
          destinationCity: this.cities[1],
          distance: 0
        }
      ];
      return;
    }

    for (const path of this.paths) {
      const pathA = this.pathService.findPath(city, path.originCity, this.paths);
      const pathB = this.pathService.findPath(city, path.destinationCity, this.paths);

      if (!pathA) {
        this.paths = [
          ...this.paths,
          {
            originCity: city,
            destinationCity: path.originCity,
            distance: 0
          }
        ];
      }

      if (!pathB) {
        this.paths = [
          ...this.paths,
          {
            originCity: city,
            destinationCity: path.destinationCity,
            distance: 0
          }
        ];
      }
    }
  }
}
