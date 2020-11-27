import { Component, ViewChild } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: "ls-heat-cal",
  templateUrl: "./heat-calendar.component.html",
  styleUrls: ["./heat-calendar.component.css"]
})
export class HeatCalendarComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
       
        {
          name: "Monday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Tuesday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Wednesday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Thursday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Friday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Saturday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Sunday",
          data: this.generateData(100, {
            min: 0,
            max: 90
          })
        }
      ],
      chart: {
        height: 200,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: "Histórico de links acessados"
      }
    };
  }

  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
}
