import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type language = 'he' | 'en';
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private language = new BehaviorSubject<string>('he');
  private translations = new BehaviorSubject<any>({});
  direction = 'rtl'

  constructor(private http: HttpClient) {
    this.loadTranslations('he'); 
    document.documentElement.dir = this.direction;
  }


  switchLanguage(lang: language) {
    this.language.next(lang);
    this.loadTranslations(lang);

    this.direction = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = this.direction;
    document.documentElement.classList.toggle('rtl', lang === 'he');
    document.documentElement.classList.toggle('ltr', lang === 'en');
  }

  private loadTranslations(lang: language) {
    this.http.get(`/assets/textLanguages/${lang}.json`).subscribe(data => {
      this.translations.next(data);
    });
  }

  getTranslation(key: string): string {
    const keys = key.split('.');
    let result = this.translations.getValue();
    for (const k of keys) {
      result = result?.[k];
      if (!result) return ""; // fallback
    }
    return result;
  }

  // reactive version - usefull in LanguagePipe
  getTranslation$(key: string): Observable<string> {
    return this.translations.asObservable().pipe(
      map(translations => {
        const keys = key.split('.');
        let result = translations;
        for (const k of keys) {
          result = result?.[k];
          if (!result) return "";
        }
        return result;
      })
    );
  }

  get currentLang$() {
    return this.language.asObservable();
  }

  get currentDirection$() {
    return this.direction;
  }

  get translations$() {
    return this.translations.asObservable();
  }
}
