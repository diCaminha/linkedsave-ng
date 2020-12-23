import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DayReadsComponent } from './day-reads.component';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [DayReadsComponent],
  imports: [BrowserModule, HttpClientModule, NgApexchartsModule],
  providers: [],
  bootstrap: [DayReadsComponent],
})
export class DayReadsModule {}
