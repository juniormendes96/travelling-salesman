import { AlgorithmService } from './../../services/algorithm/algorithm.service';
import { Component, OnInit, Input } from '@angular/core';
import { Path } from 'src/app/models/path.model';
import { PathService } from 'src/app/services/path/path.service';
import { tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  @Input() paths: Path[];

  isCalculating = false;
  numberOfGenerations: number;

  constructor(
    private algorithmService: AlgorithmService,
    private pathService: PathService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {}

  calculate() {
    if (!this.numberOfGenerations) {
      this.notificationService.create('error', 'Error', 'You need to enter the number of generations.');
    }

    this.pathService.setPaths(this.paths);
    this.algorithmService
      .start(this.numberOfGenerations)
      .pipe(tap(() => (this.isCalculating = true)))
      .subscribe(result => {
        console.log(result);
        this.isCalculating = false;
      });
  }
}
