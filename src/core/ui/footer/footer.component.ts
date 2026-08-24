import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { ISocialNetwork } from './interface/ISocialNetwork';
import { ITravel } from './interface/ITravel';
import { IFavor } from './interface/IFavor';
import { IAppConfig } from '../../../shared/interface/IAppConfig';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from '../message/service/message.service';
import { LanguageService } from '../../../shared/ui/language/service/language.service';
import { APP_CONFIG } from '../../token/app-config.token';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  messageService: MessageService = inject(MessageService);
  languageService: LanguageService = inject(LanguageService);

  APP_CONFIG: IAppConfig = inject(APP_CONFIG);

  faAngleRight: IconDefinition = faAngleRight;
  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

  favors: IFavor[] = [
    { id: 1, key: 'footer.article.summerMountainHikes' },
    { id: 2, key: 'footer.article.winterMountainHikes' },
    { id: 3, key: 'footer.article.visitingMountainTemples' },
    { id: 4, key: 'footer.article.extremeTourism' },
    { id: 5, key: 'footer.article.hikingAmazonJungle' },
    { id: 6, key: 'footer.article.tripAfrica' }
  ];

  travels: ITravel[] = [
    { id: 1, key: 'footer.favor.howToPack' },
    { id: 2, key: 'footer.favor.vitalSupplies' },
    { id: 3, key: 'footer.favor.medicalInsurance' },
    { id: 4, key: 'footer.favor.forDoctors' }
  ];

  socialNetworks: ISocialNetwork[] = [
    { id: 1, image: faTelegram },
    { id: 2, image: faVk },
    { id: 3, image: faPinterest },
    { id: 4, image: faSkype }
  ];

  onNewsSubscription(): void {
    this.messageService.showSuccess(this.languageService.translateService.instant('footer.newsSubscriptionMessage'));
  }

}