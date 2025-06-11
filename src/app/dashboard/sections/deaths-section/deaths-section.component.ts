import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { deathsFields } from 'src/assets/data/keys/deaths.keys';
import * as deathsDataJson from 'src/assets/data/deathsByDate.json';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Subscription } from 'rxjs';
import { DeathsChartService } from 'src/app/core/services/death-chart-service.service';
import { ThemeObserverService } from 'src/app/core/services/theme-observer.service';

@Component({
  selector: 'app-deaths-section',
  templateUrl: './deaths-section.component.html',
  styleUrls: ['./deaths-section.component.scss']
})
export class DeathsSectionComponent implements OnInit, OnDestroy {
  deathsFields = deathsFields;
  currentRange: string = 'lastMonth';
  selectorOpen: boolean = false;
  deathsData: Record<string, number> = deathsDataJson;
  rangeOptions: { label: string; value: string }[] = [];
  private subs = new Subscription();

  dates: string[] = [];
  values: number[] = [];
  movingAverage: number[] = [];
  yAxisConfig: { min: number; max: number; interval: number } | null = null;

  translations: { daily: string; avg: string; date: string; deaths: string } = {
    daily: '', avg: '', date: '', deaths: ''
  };

  constructor(
    private translationService: TranslationService,
    private deathsChartService: DeathsChartService,
    private themeObserverService: ThemeObserverService
  ) {}

  ngOnInit(): void {
    this.buildRangeOptions();

    this.subs.add(
      this.themeObserverService.observeBodyClassChanges().subscribe(() => {
        this.updateChart(this.currentRange);
      })
    );
    this.subs.add(
      this.translationService.translations$.subscribe(() => {
        this.buildRangeOptions();
        this.updateChart(this.currentRange);
      })
    );

    this.updateChart(this.currentRange);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.subs.unsubscribe();
  }

  onRangeChange(newRange: string): void {
    this.currentRange = newRange;
    this.updateChart(newRange);
  }

  buildRangeOptions(): void {
    this.rangeOptions = [
      { label: this.translationService.getTranslation(`Deaths.${this.deathsFields.Last30Days}`), value: 'lastMonth' },
      { label: this.translationService.getTranslation(`Deaths.${this.deathsFields.Last3Months}`), value: 'last3Months' },
      { label: this.translationService.getTranslation(`Deaths.${this.deathsFields.Last6Months}`), value: 'last6Months' },
      { label: this.translationService.getTranslation(`Deaths.${this.deathsFields.Last1Year}`), value: 'lastYear' },
      { label: this.translationService.getTranslation(`Deaths.${this.deathsFields.EntirePeriod}`), value: 'all' }
    ];
  }

  updateChart(rangeKey: string): void {
    const chartData = this.deathsChartService.getChartData(this.deathsData, rangeKey);

    this.dates = chartData.dates;
    this.values = chartData.values;
    this.movingAverage = chartData.movingAverage;
    this.yAxisConfig = chartData.yAxisConfig;

    this.translations = {
      daily: this.translationService.getTranslation(`Deaths.${this.deathsFields.DeathsDaily}`),
      avg: this.translationService.getTranslation(`Deaths.${this.deathsFields.SevenDaysAvg}`),
      date: this.translationService.getTranslation(`Deaths.${this.deathsFields.Date}`),
      deaths: this.translationService.getTranslation(`Deaths.${this.deathsFields.NumberOfDeaths}`)
    };
  }
}
