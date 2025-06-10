import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeathsChartService {
  private yAxisConfigs: { [key: string]: { min: number; max: number; interval: number } | null } = {
    lastMonth: { min: 0, max: 0.5, interval: 0.1 },
    last3Months: { min: 0, max: 1, interval: 0.2 },
    last6Months: { min: 0, max: 1, interval: 0.2 },
    lastYear: { min: 0, max: 4, interval: 1 },
    all: { min: 0, max: 100, interval: 20 }
  };

  getChartData(data: Record<string, number>, rangeKey: string): {
    dates: string[];
    values: number[];
    movingAverage: number[];
    yAxisConfig: { min: number; max: number; interval: number } | null;
  } {
    const allDates = Object.keys(data).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('-').map(Number);
      const [dayB, monthB, yearB] = b.split('-').map(Number);
      return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
    });

    const allValues = allDates.map(date => data[date]);

    let daysToShow: number | null;
    switch (rangeKey) {
      case 'lastMonth': daysToShow = 30; break;
      case 'last3Months': daysToShow = 90; break;
      case 'last6Months': daysToShow = 180; break;
      case 'lastYear': daysToShow = 365; break;
      case 'all':
      default: daysToShow = null;
    }

    const dates = daysToShow ? allDates.slice(-daysToShow) : allDates;
    const values = daysToShow ? allValues.slice(-daysToShow) : allValues;

    const formattedDates = dates.map(date => {
      const [day, month] = date.split('-');
      return `${day}.${month}`;
    });

    const movingAverage = values.map((_, i, arr) => {
      const start = Math.max(0, i - 6);
      const slice = arr.slice(start, i + 1);
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      return +avg.toFixed(2);
    });

    return {
      dates: formattedDates,
      values,
      movingAverage,
      yAxisConfig: this.yAxisConfigs[rangeKey]
    };
  }
}
