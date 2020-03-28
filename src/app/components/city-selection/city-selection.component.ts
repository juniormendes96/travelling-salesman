import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.component.html',
  styleUrls: ['./city-selection.component.scss']
})
export class CitySelectionComponent implements OnInit {
  @Input() cities: string[];
  @Output() cityChange = new EventEmitter();

  constructor(private notificationService: NzNotificationService) {}

  ngOnInit() {}

  removeCity(index: number): void {
    if (this.cities.length > 3) {
      this.cities.splice(index, 1);
      this.cityChange.emit();
    } else {
      this.createNotification('You have to select at least 3 cities.');
    }
  }

  addCity() {
    if (this.cities.length < 10) {
      const newCity = '';
      this.cities.push(newCity);
      this.cityChange.emit();
    } else {
      this.createNotification('You have to select up to 10 cities.');
    }
  }

  onCityChange(city: string) {
    this.cityChange.emit();
  }

  trackByFn(city) {
    return city;
  }

  private createNotification(description: string, title = 'Error', type = 'error') {
    this.notificationService.create(type, title, description);
  }
}
