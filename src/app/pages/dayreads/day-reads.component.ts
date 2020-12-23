import { Component, ViewChild } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { Dayread } from 'src/app/core/models/dayread';
import { DayreadsService } from '../../core/services/dayreads.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'ls-day-reads',
  templateUrl: './day-reads.component.html',
  styleUrls: ['./day-reads.component.css'],
})
export class DayReadsComponent {
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
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.mondayReads
              ),
            },
            {
              name: 'Tuesday',
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.tuesdayReads
              ),
            },
            {
              name: 'Wednesday',
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.wednesdayReads
              ),
            },
            {
              name: 'Thursday',
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.thrusdayReads
              ),
            },
            {
              name: 'Friday',
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.fridayReads
              ),
            },
            {
              name: 'Saturday',
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.saturdayReads
              ),
            },
            {
              name: 'Sunday',
              data: this.generateData(
                this.days_of_a_year(2020) / 7,
                this.sundayReads
              ),
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
            text: 'Links read per day',
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
      allDates.unshift(newPrevDate);
      allDatesAfter.push(newAfterDate);
    }

    allDates.push(today);
    allDates.push(...allDatesAfter);

    const parsedDates = [
      'None',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var i = 1;
    let counterMonth = 1;
    var series = [];
    while (i < count - 1) {
      if (i % 4 === 0) {
        var x = parsedDates[counterMonth];
        counterMonth++;
      } else var x = '';

      let qnt = 0;

      for (let aux = 0; aux < dayReadsWeek.length; aux++) {
        let date: Date = new Date(dayReadsWeek[aux].date);
        let week = Math.floor(this.daysIntoYear(date) / 7);
        if (week === i) {
          qnt = dayReadsWeek[aux].total;
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

  days_of_a_year(year) {
    return this.isLeapYear(year) ? 366 : 365;
  }

  isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  daysIntoYear(date) {
    return (
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
    );
  }

}
