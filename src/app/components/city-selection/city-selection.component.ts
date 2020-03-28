import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.scss']
})
export class CitySelectionComponent implements OnInit {
  @Input() cities: string[];

  constructor(private notificationService: NzNotificationService) {}

  ngOnInit() {}

  removeCity(index: number): void {
    if (this.cities.length > 3) {
      this.cities.splice(index, 1);
    } else {
      this.createNotification('You have to select at least 3 cities.');
    }
  }

  addCity() {
    if (this.cities.length < 10) {
      this.cities.push('');
    } else {
      this.createNotification('You have to select up to 10 cities.');
    }
  }

  private createNotification(description: string, title = 'Error', type = 'error') {
    this.notificationService.create(type, title, description);
  }
}
