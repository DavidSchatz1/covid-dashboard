import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NumericDataService {
  private data = new BehaviorSubject<Record<string, any>>({});

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData(): void {
    this.http.get('/assets/data/numeric-data.json').subscribe(data => {
      this.data.next(data);
    });
  }

  getValue(key: string): any {
    const keys = key.split('.');
    let result: any = this.data.getValue();
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return null;
    }
    return result;
  }

  getValue$(key: string): Observable<any> {
    return this.data.asObservable().pipe(
      map(data => {
        const keys = key.split('.');
        let result: any = data;
        for (const k of keys) {
          result = result?.[k];
          if (result === undefined) return null;
        }
        return result;
      })
    );
  }

  getAll(): Observable<Record<string, any>> {
    return this.data.asObservable();
  }
}
