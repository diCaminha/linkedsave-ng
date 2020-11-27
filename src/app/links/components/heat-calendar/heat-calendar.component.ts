import { Component, ViewChild } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { DayreadsService } from 'src/app/dayreads/dayreads.service';
import { Dayread } from 'src/app/models/dayread';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'ls-heat-cal',
  templateUrl: './heat-calendar.component.html',
  styleUrls: ['./heat-calendar.component.css'],
})
export class HeatCalendarComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  mondayReads: Dayread[] = [];
  tuesdayReads: Dayread[] = [];
  wednesdayReads: Dayread[] = [];
  thrusdayReads: Dayread[] = [];
  fridayReads: Dayread[] = [];
  saturdayReads: Dayread[] = [];
  sundayReads: Dayread[] = [];

  constructor(private dayreadservice: DayreadsService) {
    this.dayreadservice.getDayReads().subscribe(
      (result) => {
        this.mondayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Sunday'
        );
      },
      (err) => {
        console.log(err);
      }
    );
    this.chartOptions = {
      series: [
        {
          name: 'Monday',
          data: this.generateData(50, this.mondayReads),
        },
        {
          name: 'Tuesday',
          data: this.generateData(50, this.tuesdayReads),
        },
        {
          name: 'Wednesday',
          data: this.generateData(50, this.wednesdayReads),
        },
        {
          name: 'Thursday',
          data: this.generateData(50, this.thrusdayReads),
        },
        {
          name: 'Friday',
          data: this.generateData(50, this.fridayReads),
        },
        {
          name: 'Saturday',
          data: this.generateData(50, this.saturdayReads),
        },
        {
          name: 'Sunday',
          data: this.generateData(50, this.sundayReads),
        },
      ],
      chart: {
        height: 250,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      title: {
        text: 'Histórico de links acessados',
      },
    };
  }

  public generateData(count, dayReadsWeek) {
    //criar array de string das datas de 30 dias pra tras e 30 dias pra frente
    const today = new Date();
    const allDates: Date[] = [];
    const allDatesAfter: Date[] = [];
    for (let index = 1; index < count / 2; index++) {
      let newPrevDate = new Date();
      let newAfterDate = new Date();
      newPrevDate.setDate(today.getDate() - index);
      newAfterDate.setDate(today.getDate() + index);
      allDates.push(newPrevDate);
      allDatesAfter.push(newAfterDate);
    }
    allDates.push(today);
    allDates.push(...allDatesAfter);

    const parsedDates = allDates.map(
      (date) =>
        date.getMonth() + '-' + date.getUTCDate() + '-' + date.getFullYear()
    );

    var i = 1;
    var series = [];
    while (i < count - 1) {
      if (i % 10 === 0) var x = parsedDates[i];
      else var x = '';
      var y = Math.floor(Math.random() * (90 - 0 + 1)) + 0;

      series.push({
        x: x,
        y: y,
      });
      console.log(series);
      i++;
    }
    return series;
  }
}
