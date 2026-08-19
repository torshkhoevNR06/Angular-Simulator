import { DestroyRef, inject, Injectable } from '@angular/core';
import { TranslateService, type Translation } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PrimeNG } from 'primeng/config';
import { Language } from '../enum/Language';
import { ILanguage } from '../interface/ILanguage';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  translateService: TranslateService = inject(TranslateService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private destroyRef: DestroyRef = inject(DestroyRef);
  private primeng: PrimeNG = inject(PrimeNG);
  
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCurrentLanguage());
  language$: Observable<string> = this.languageSubject.asObservable();

  languages: ILanguage<Language>[] = [
    { name: 'RU', value: Language.RU },
    { name: 'EN', value: Language.EN },
    { name: 'UZ', value: Language.UZ }
  ];

  getCurrentLanguage(): string {
    const browserLanguage: string = navigator.language.split('-')[0];
    
    if (this.localStorageService.getItem('language')) {
      return this.localStorageService.getItem('language')!;
    }

    return browserLanguage || 'ru';
  }
  
  changeLanguage(currentLanguage: string): void {
    this.translateService.use(currentLanguage);
    this.localStorageService.setItem('language', currentLanguage);
    this.translateService.get('primeng').pipe(
      tap((translations: Translation) => this.primeng.setTranslation(translations)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
    this.languageSubject.next(currentLanguage);
  }

}