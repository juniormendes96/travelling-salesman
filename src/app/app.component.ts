import { take } from 'rxjs/operators';
import { PathService } from './services/path/path.service';
import { AlgorithmService } from './services/algorithm/algorithm.service';
import { Component, OnInit } from '@angular/core';
import pathsMock from './mock/paths.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private algorithmService: AlgorithmService, private pathService: PathService) {}

  ngOnInit() {
    this.pathService.setPaths(pathsMock);
    this.algorithmService
      .start()
      .pipe(take(1))
      .subscribe(console.log);
  }
}
