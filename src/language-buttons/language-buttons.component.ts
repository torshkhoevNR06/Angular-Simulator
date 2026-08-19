import { Component, inject } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-translate',
  imports: [AsyncPipe, SelectButtonModule, FormsModule],
  templateUrl: './language-buttons.component.html',
  styleUrl: './language-buttons.component.scss'
})
export class TranslateComponent {
  
  languageService: LanguageService = inject(LanguageService);

}