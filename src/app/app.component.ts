import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../core/ui/loader/loader.component';
import { MessageType } from '../shared/enum/MessageType';
import { Color } from '../shared/enum/Color';
import { IAppConfig } from '../shared/interface/IAppConfig';
import { TranslateService } from '@ngx-translate/core';
import { MessageComponent } from '../core/ui/message/message.component';
import { APP_CONFIG } from '../core/token/app-config.token';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, LoaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private translate: TranslateService = inject(TranslateService);

  APP_CONFIG: IAppConfig = inject(APP_CONFIG);
  messageType: typeof MessageType = MessageType;

  constructor() {
    this.isPrimaryColor(Color.RED);
    this.translate.addLangs(['ru', 'en', 'uz']);
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }

}