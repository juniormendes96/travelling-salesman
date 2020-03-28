import { PathService } from './services/path/path.service';
import { Component, OnInit } from '@angular/core';
import { Path } from './models/path.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
  index = 0;

  hasInvalidCity = false;

  constructor(private pathService: PathService) {}

  ngOnInit() {}

  onIndexChange(index: number): void {
    this.index = index;
  }

  onCityChange() {
    this.hasInvalidCity = this.cities.some(city => !city);
    this.buildPaths();
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
