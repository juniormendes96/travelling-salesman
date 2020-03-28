import { Path } from './../../models/path.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.scss']
})
export class DistancesComponent implements OnInit {
  @Input() paths: Path[];

  constructor() {}

  ngOnInit() {}
}
