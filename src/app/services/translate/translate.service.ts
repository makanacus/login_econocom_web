// src/app/services/simple-translate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations: any = {};
  private currentLang = 'es';
  private langChange = new BehaviorSubject<string>(this.currentLang);

  langChange$ = this.langChange.asObservable();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  loadTranslations(lang: string): void {
    this.http.get(`/assets/i18n/${lang}.json`).pipe(
      catchError(() => {
        console.warn(`No se encontró el archivo para el idioma ${lang}`);
        return of({});
      })
    ).subscribe(translations => {
      this.translations = translations;
      this.currentLang = lang;
      this.langChange.next(lang);
    });
  }

  setLanguage(lang: string) {
    if (lang === this.currentLang) return;
    this.loadTranslations(lang);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (!value) break;
      value = value[k];
    }

    return value || key;
  }

  getCurrentLanguage() {
    return this.currentLang;
  }
}
