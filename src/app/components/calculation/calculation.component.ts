import { Chromosome } from './../../models/chromosome.model';
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
  fittestChromosome: Chromosome;

  constructor(
    private algorithmService: AlgorithmService,
    private pathService: PathService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {}

  calculate() {
    if (!this.numberOfGenerations) {
      this.notificationService.create('error', 'Error', 'You need to enter the number of generations.');
      return;
    }

    this.pathService.setPaths(this.paths);
    this.algorithmService
      .start(this.numberOfGenerations)
      .pipe(tap(() => (this.isCalculating = true)))
      .subscribe(fittest => {
        this.fittestChromosome = fittest;
        this.isCalculating = false;
      });
  }
}
