import { PathService } from './services/path/path.service';
import { AlgorithmService } from './services/algorithm/algorithm.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cities: string[] = ['Vancouver', 'Toronto', 'Hamilton'];
  index = 0;

  constructor(private algorithmService: AlgorithmService, private pathService: PathService) {}

  ngOnInit() {}

  onIndexChange(index: number): void {
    this.index = index;
  }
}
