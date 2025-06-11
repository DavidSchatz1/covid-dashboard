import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-deaths-chart',
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
  styleUrls: ['./deaths-chart.component.scss']
})
export class DeathsChartComponent implements OnChanges {
  @Input() dates: string[] = [];
  @Input() values: number[] = [];
  @Input() movingAverage: number[] = [];
  @Input() yAxisConfig: { min: number, max: number, interval: number } | null = null;
  @Input() translations: { daily: string; avg: string; date: string; deaths: string } = {
    daily: '', avg: '', date: '', deaths: ''
  };

  chartOptions: any;

  ngOnChanges(): void {
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-color').trim();
    const bgColor = getComputedStyle(document.body).getPropertyValue('--card-background').trim();
    const directionForChart = getComputedStyle(document.body).direction === 'rtl' ? 'right' : 'left';

    this.chartOptions = {
      backgroundColor: bgColor,
      textStyle: { fontFamily: 'Open Sans', color: textColor },
      tooltip: { trigger: 'axis' },
      legend: {
        data: [
          {
            icon: 'circle',
            name: this.translations.daily,
          },
          {
            name: this.translations.avg,
            icon: 'circle'
          }
        ],
        textStyle: { color: textColor },
        top: 'top',
        left: directionForChart,
      },
      grid: { left: 70, right: 20, top: 60, bottom: 60 },
      xAxis: {
        type: 'category',
        data: this.dates,
        boundaryGap: true,
        axisLine: { lineStyle: { color: textColor } },
        axisLabel: {
          margin: 15, align: 'center', fontSize: 10, color: textColor
        },
        name: this.translations.date,
        nameLocation: 'middle',
        nameTextStyle: {
          color: textColor, fontSize: 14, fontWeight: 500,
          fontFamily: 'Open Sans', align: 'center', padding: [20, 0, 0, 0]
        }
      },
      yAxis: {
        type: 'value',
        min: this.yAxisConfig?.min ?? 0,
        max: this.yAxisConfig?.max ?? Math.max(...this.values) + 1,
        interval: this.yAxisConfig?.interval ?? null,
        name: this.translations.deaths,
        nameLocation: 'middle',
        nameRotate: 90,
        offset: 10,
        nameTextStyle: {
          color: textColor, fontSize: 14, fontWeight: 500,
          fontFamily: 'Open Sans', align: 'center', padding: [0, 0, 30, 0]
        }
      },
      series: [
        {
          name: this.translations.daily,
          type: 'bar',
          data: this.values,
          itemStyle: { color: 'rgb(18, 65, 38)' },
          label: { show: false, position: 'top', fontSize: 12, fontFamily: 'Open Sans', color: textColor }
        },
        {
          name: this.translations.avg,
          type: 'line',
          data: this.movingAverage,
          smooth: true,
          lineStyle: { color: 'rgb(181, 118, 0)', width: 2 },
          itemStyle: { color: 'rgb(181, 118, 0)' },
          connectNulls: true,
          symbol: 'none'
        }
      ]
    };
  }
}