import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  NgZorroAntdModule,
  NZ_I18N,
  en_US,
  NzStepsModule,
  NzInputModule,
  NzButtonModule,
  NzNotificationModule,
  NzCollapseModule,
  NzInputNumberModule,
  NzModalModule
} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CitySelectionComponent } from './components/city-selection/city-selection.component';
import { DistancesComponent } from './components/distances/distances.component';
import { CalculationComponent } from './components/calculation/calculation.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, CitySelectionComponent, DistancesComponent, CalculationComponent],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzStepsModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    NzCollapseModule,
    NzInputNumberModule,
    NzModalModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
