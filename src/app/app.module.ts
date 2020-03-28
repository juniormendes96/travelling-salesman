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
  NzNotificationModule
} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CitySelectionComponent } from './components/city-selection/city-selection.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, CitySelectionComponent],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzStepsModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
