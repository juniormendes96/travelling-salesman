import { PathService } from './services/path/path.service';
import { AlgorithmService } from './services/algorithm/algorithm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private algorithmService: AlgorithmService, private pathService: PathService) {}

  ngOnInit() {
    const paths = [
      { originCity: 'Vancouver', destinationCity: 'Ottawa', distance: 50 },
      { originCity: 'Vancouver', destinationCity: 'Los Angeles', distance: 200 },

      { originCity: 'Los Angeles', destinationCity: 'Ottawa', distance: 300 },
      { originCity: 'Los Angeles', destinationCity: 'Vancouver', distance: 200 },

      { originCity: 'Ottawa', destinationCity: 'Vancouver', distance: 50 },
      { originCity: 'Ottawa', destinationCity: 'Los Angeles', distance: 300 }
    ];
    this.pathService.setPaths(paths);
    this.algorithmService.start();
  }
}
