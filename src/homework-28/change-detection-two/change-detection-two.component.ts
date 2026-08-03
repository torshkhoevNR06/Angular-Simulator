import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-detection-two',
  imports: [],
  templateUrl: './change-detection-two.component.html',
  styleUrl: './change-detection-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionComponentTwo implements OnInit {

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  count: number = 0;

  ngDoCheck(): void {
    console.log('Change Detections');
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.count++;
    //   this.cdr.markForCheck();
    // }, 2000);

    // setTimeout(() => {
    //   this.count++;
    //   this.cdr.detectChanges();
    // }, 2000);

    this.cdr.detach();
    this.cdr.reattach();
  }

  eventClick(): void {
    this.count++;
    console.log('eventClick');
  }

  setTimeout(): void {
    setTimeout(() => this.count++, 2000);
    console.log('setTimeout');
  }

  setInterval(): void {
    setInterval(() => this.count++, 2000);
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

  /* 
    1. Что произошло после вызова markForCheck()?
    - Счётчик начал обновляться поскольку вызов setInterval обновляет счётчик и вызывает markForCheck() который помечает компонент как грязный и сообщает ангуляру чтобы запустил CD при следующем изменений, также zone.js сообщил к этому моменту что закончилось асинхронное событие но конкретно тут CD триггериться именно от механизма ручного вызова CD а не от zone.js
    
    2. Обновился ли интерфейс сразу?
    - Учитывая задержку асинхронного события то в целом да
    
    3. Когда фактически произошел Change Detection?
    - при вызове markForCheck()
   
    4. Почему без markForCheck() интерфейс не обновлялся?
    - Потому что при OnPush - CD заглянет в компонент но не проверит байдинги поскольку асихронные события не яв-ся причиной для значений в компоненте и поэтому приходится сообщать др способами - один из них это markForCheck()
  */ 

  /* 
    1. Чем поведение отличается от предыдущего сценария?
    - В случае, если тайм-аут при его собратывании, метод `detectChanges` говорит ангуляру: проверить этот компонент сразу. 
    
    2. Выполняется ли Change Detection немедленно?
    - Да
    
    3. Какие компоненты были проверены?
    - Логируются оба: change-detection-one/change-detection-two 
    
    4. В каких случаях использование detectChanges() предпочтительнее?
    - Ну например когда вызывается событие из какой-то подключенной библиотеки которая не предусматривает внутри себя сценарий работы при zoneless стратегий и получается когда нам нужно немедленно вызвать её функцию мы и используй такой ручной механизм
  */ 

  /* 
    1. Обновляется ли интерфейс?
    - Нет
    
    2. Выполняется ли ngDoCheck()?
    - Да
    
    3. Почему Angular перестал проверять компонент?
    - из-за detach()
    
    4. Какие изменения значения больше не работают?
    - Все
  */ 

  /* 
    1. Что изменилось после reattach()?
    - Значение счётчика отображается и при нажатий на кнопок меняются значение не только в компоненте но на стр
    
    2. Когда компонент снова начнет участвовать в Обнаружении изменений?
    - После того как CD был отключен через detach() и после вызвался reattach() который включает заново CD то, в тот момент и начал снова работать CD
    
    3. Нужны ли дополнительные варианты обнаруженияChanges() или markForCheck()?
    - По моему нет
  */ 

}