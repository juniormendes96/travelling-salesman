import { Path } from './../../models/path.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.scss']
})
export class DistancesComponent implements OnInit {
  @Input() paths: Path[];
  @Output() distanceChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDistanceChange() {
    this.distanceChange.emit();
  }
}
