import { inject, Injectable } from '@angular/core';
import { TranslateService, type Translation } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PrimeNG } from 'primeng/config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  translateService: TranslateService = inject(TranslateService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private primeng: PrimeNG = inject(PrimeNG);
  
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCurrentLanguage());
  language$: Observable<string> = this.languageSubject.asObservable();

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
      tap((translations: Translation) => this.primeng.setTranslation(translations))
    ).subscribe();
    this.languageSubject.next(currentLanguage);
  }

}