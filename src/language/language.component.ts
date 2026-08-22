import { Component, inject } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-language',
  imports: [AsyncPipe, SelectButtonModule, FormsModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class Language {
  
  languageService: LanguageService = inject(LanguageService);

}