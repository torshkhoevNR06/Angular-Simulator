import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-change-detection-one',
  imports: [],
  templateUrl: './change-detection-one.component.html',
  styleUrl: './change-detection-one.component.scss'
})
export class ChangeDetectionComponentOne implements DoCheck {

  private readonly http: HttpClient = inject(HttpClient);
  
  count: number = 0;
  
  ngDoCheck(): void {
    console.log('Change Detection');
  }

  eventClick(): void {
    this.count++;
    console.log('eventClick');
  }

  setTimeout(): void {
    setTimeout(() => this.count++, 2000);
    console.log('setTimeout');
  }

  promise(): void {
    new Promise((resolve, _) => {
      resolve('promise');
    }).then(
      result => {
        this.count++;
        console.log(result);
      },
      error => console.error('Rejected:' + error)
    );
  }

  HTTP(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      tap(() => {
        this.count++;
        console.log('HTTP');
      })
    ).subscribe();
  }

  setInterval(): void {
    setInterval(() => {
      this.count++;
      console.log('setInterval');
    }, 2000);
  }

  multiEvent(): void {
    this.eventClick();
    this.setTimeout();
    this.promise();
  }

/* 
  1. Обновился ли интерфейс автоматически?
  - Да
  2. Сколько раз выполнился ngDoCheck()?
  - Два раза, затем идёт накапливания вызовов в счётчике консоле разработчика
  3. Понадобилось ли использовать ChangeDetectorRef?
  - не понадобилось
  4. Что именно, по вашему мнению, стало причиной запуска Change Detection?
  - Первый вызов CD при инициализаций компонента
  - Второй вызов CD при Http-запросе
  - Третьи вызов CD с накоплением вызова при таймере в header-компоненте
*/

}