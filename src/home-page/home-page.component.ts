import { Component, inject } from '@angular/core';
import { MessageService } from '../service/message.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faAngleDown, faCalendar, IconDefinition, faShieldHalved, faPeopleGroup, faTag, faStar } from '@fortawesome/free-solid-svg-icons';
import { IAdvantage } from '../interface/IAdvantage';
import { IDirection } from '../interface/IDirection';
import { IArticle } from '../interface/IArticle';
import { ILocation } from '../interface/ILocation';
import { IParticipant } from '../interface/IParticipant';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe, DatePipeConfig } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, DatePipe, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  
  messageService: MessageService = inject(MessageService);

  liveInputValue!: string;
  selectedLocation!: boolean;
  selectedDate!: string;
  selectedParticipants!: boolean;
  DATE_PIPE_DEFAULT_OPTIONS: DatePipeConfig = inject(DATE_PIPE_DEFAULT_OPTIONS);
  
  faAngleRight: IconDefinition = faAngleRight;
  faAngleDown: IconDefinition = faAngleDown;
  faCalendar: IconDefinition = faCalendar;
  faShieldHalved: IconDefinition = faShieldHalved;
  faPeopleGroup: IconDefinition = faPeopleGroup;
  faTag: IconDefinition = faTag;
  faStar: IconDefinition = faStar;
  
  cards: IAdvantage[] = [
    {
      id: 1,
      iconName: faPeopleGroup,
      keyOne: 'main.cards.experiencedGuide.title',
      keyTwo: 'main.cards.experiencedGuide.desc'
    },
    {
      id: 2,
      iconName: faShieldHalved,
      keyOne: 'main.cards.safeTrip.title',
      keyTwo: 'main.cards.safeTrip.desc'
    },
    {
      id: 3,
      iconName: faTag,
      keyOne: 'main.cards.loyalPrices.title',
      keyTwo: 'main.cards.loyalPrices.desc'
    }
  ];
 
  directions: IDirection[] = [
    {
      id: 1,
      image: 'mountain-lake',
      rating: '4.9',
      keyOne: 'main.directions.mountainLake.title',
      keyTwo: 'main.directions.mountainLake.desc',
      price: 480
    },
    {
      id: 2,
      image: 'night-mountains',
      rating: '4.5',
      keyOne: 'main.directions.nightMountains.title',
      keyTwo: 'main.directions.nightMountains.desc',
      price: 500
    },
    {
      id: 3,
      image: 'mountain-exercise',
      rating: '5.0',
      keyOne: 'main.directions.mountainExercise.title',
      keyTwo: 'main.directions.mountainExercise.desc',
      price: 230
    }
  ];
  
  articles: IArticle[] = [
    {
      id: 1,
      image: 'manarola-sunset',
      keyOne: 'main.articles.italy.title',
      keyTwo: 'main.articles.italy.desc',
      date: Date.now()
    },
    {
      id: 2,
      image: 'flight-dawn',
      keyOne: 'main.articles.flightDawn.title',
      keyTwo: 'main.articles.flightDawn.desc',
      date: Date.now()
    },
    {
      id: 3,
      image: 'road-trip',
      keyOne: 'main.articles.roadTrip.title',
      keyTwo: 'main.articles.roadTrip.desc',
      date: Date.now()
    },
    {
      id: 4,
      image: 'taj-mahal',
      keyOne: 'main.articles.tajMahal.title',
      keyTwo: 'main.articles.tajMahal.desc',
      date: Date.now()
    }
  ];

  locations: ILocation[] = [
    { id: 1, key: 'main.locations.iceland' },
    { id: 2, key: 'main.locations.novosibirsk' },
    { id: 3, key: 'main.locations.costaRica' }
  ];

  participants: IParticipant[] = [
    { id: 1, key: 'main.participants.Alexander' },
    { id: 2, key: 'main.participants.Maria' },
    { id: 3, key: 'main.participants.Dmitry' },
    { id: 4, key: 'main.participants.Anna' },
    { id: 5, key: 'main.participants.Ivan' },
    { id: 6, key: 'main.participants.Catherine' },
    { id: 7, key: 'main.participants.Sergei' },
    { id: 8, key: 'main.participants.Olga' },
    { id: 9, key: 'main.participants.Andrey' },
    { id: 10, key: 'main.participants.Natalia' }
  ];

  isFormValid(): boolean {
    return this.selectedLocation && !!this.selectedDate && this.selectedParticipants;
  }

}
