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
          (dayread) => dayread.dayWeek === 'Monday'
        );
        this.tuesdayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Tuesday'
        );
        this.wednesdayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Wednesday'
        );
        this.thrusdayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Thursday'
        );
        this.fridayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Friday'
        );
        this.saturdayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Saturday'
        );
        this.sundayReads = result.data.filter(
          (dayread) => dayread.dayWeek === 'Sunday'
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
          colors: ['#7b1fa2'],
          title: {
            text: 'Histórico de links acessados',
          },
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public generateData(count, dayReadsWeek: Dayread[]) {
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
      if (i % 5 === 0) var x = parsedDates[i];
      else var x = '';

      let contain: boolean = false;
      let qnt = 0;
      for (let aux = 0; aux < dayReadsWeek.length; aux++) {
        if (dayReadsWeek[aux].date === parsedDates[i]) {
            contain = true;
            qnt = dayReadsWeek[aux].total;
            break;
        }
      }

      var y = qnt;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }
}
