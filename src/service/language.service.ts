import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  translate: TranslateService = inject(TranslateService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCurrentLanguage());
  language$: Observable<string> = this.languageSubject.asObservable();

  getCurrentLanguage(): string {
    return this.localStorageService.getItem('language') || 'ru';
  }
  
  changeLanguage(currentLanguage: string): void {
    this.translate.use(currentLanguage);
    this.localStorageService.setItem('language', currentLanguage);
  }

}