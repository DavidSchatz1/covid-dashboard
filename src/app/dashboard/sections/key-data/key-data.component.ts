import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyDataFields } from 'src/assets/data/keys/key-data.keys';
import { TranslationService } from 'src/app/core/services/translation.service';
import { ThemeObserverService } from 'src/app/core/services/theme-observer.service';

@Component({
  selector: 'app-key-data',
  templateUrl: './key-data.component.html',
  styleUrls: ['./key-data.component.scss']
})
export class KeyDataComponent implements OnInit, OnDestroy {
  option: any;
  KeyDataFields = KeyDataFields;
  private subs = new Subscription();

  constructor(
    private translationService: TranslationService,
    private themeObserverService: ThemeObserverService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.translationService.translations$.subscribe(() => {
        this.buildChartOptions();
      })
    );

    this.subs.add(
      this.themeObserverService.observeBodyClassChanges().subscribe(() => {
        this.buildChartOptions();
      })
    );

    this.buildChartOptions();
  }

  getCssVariable(name: string): string {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  buildChartOptions(): void {
    const textAlign = getComputedStyle(document.body).direction === 'rtl' ? 'right' : 'left';
    const textColor = this.getCssVariable('--text-color');
    const bgColor = this.getCssVariable('--card-background');

    this.option = {
      textStyle: {
        fontFamily: getComputedStyle(document.body).fontFamily
      },
      tooltip: {
        textStyle: {
          align: textAlign
        }
      },
      legend: {
        left: textAlign
      },
      grid: {
        left: 70,
        right: 20,
        top: 40,
        bottom: 40
      },
      xAxis: {
        type: 'category',
        data: [
          '20.04-26.04',
          '27.04-03.05',
          '04.05-10.05',
          this.translationService.getTranslation(`key-data.${KeyDataFields.CurrentWeek}`),
          'dummy-point'
        ],
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#e0e0e0' } },
        axisLabel: {
          margin: 30,
          align: 'left',
          rotate: 20,
          fontSize: 10,
          color: textColor,
          formatter: (value: any) => (value === 'dummy-point' ? '' : value)
        }
      },
      yAxis: {
        type: 'value',
        name: this.translationService.getTranslation(`key-data.${KeyDataFields.Average}`),
        min: 0,
        max: 15,
        interval: 3,
        nameLocation: 'middle',
        nameRotate: 90,
        offset: 10,
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'Open Sans',
          align: 'center',
          padding: [0, 0, 30, 0],
          color: textColor
        },
        axisLabel: {
          color: textColor
        },
        axisLine: { lineStyle: { color: '#e0e0e0' } },
        splitLine: { lineStyle: { color: '#e0e0e0' } }
      },
      series: [
        {
          type: 'line',
          step: 'end',
          data: [5, 5, 7, 14, 14],
          lineStyle: {
            color: 'rgb(0, 208, 245)',
            width: 2
          },
          symbol: 'circle',
          symbolSize: 1,
          itemStyle: {
            color: 'rgb(0, 208, 245)'
          },
          emphasis: {
            focus: 'series',
            scale: 8
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 14,
            fontFamily: 'Open Sans',
            color: textColor,
            padding: [0, 0, 0, 50]
          },
          markArea: {
            silent: true,
            itemStyle: {
              color: 'rgba(0, 237, 245, 0.03)'
            },
            data: [
              [
                { xAxis: '27.04-03.05' },
                { xAxis: '04.05-10.05' }
              ],
              [
                { xAxis: this.translationService.getTranslation(`key-data.${KeyDataFields.CurrentWeek}`) },
                { xAxis: 'dummy-point' }
              ]
            ]
          }
        }
      ]
    };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
