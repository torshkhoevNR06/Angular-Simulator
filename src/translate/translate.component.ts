import { Component, inject, Input } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-translate',
  imports: [AsyncPipe],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.scss',
  host: { '[class.translate--auth]': 'mode === "auth"' }
})
export class TranslateComponent {

  @Input() mode: 'normal' | 'auth' = 'normal';
  languageService: LanguageService = inject(LanguageService);

}