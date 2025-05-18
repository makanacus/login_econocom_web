import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: false,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private currentLang: string = '';
  private lastKey: string = '';
  private lastValue: string = '';
  private langSub: Subscription;

  constructor(
    private translateService: TranslateService,
    private _ref: ChangeDetectorRef
  ) {
    this.langSub = this.translateService.langChange$.subscribe(lang => {
      this.currentLang = lang;
      this.lastValue = '';
      this._ref.markForCheck();
    });
  }

  transform(key: string): string {
    if (!key) return '';

    if (key === this.lastKey && this.lastValue) {
      return this.lastValue;
    }

    this.lastKey = key;
    this.lastValue = this.translateService.translate(key) || key;
    return this.lastValue;
  }

  ngOnDestroy() {
    this.langSub.unsubscribe();
  }
}
