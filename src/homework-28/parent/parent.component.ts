import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { ChangeDetectionComponentOne } from '../change-detection-one/change-detection-one.component';
import { ChangeDetectionComponentTwo } from '../change-detection-two/change-detection-two.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, ChangeDetectionComponentOne, ChangeDetectionComponentTwo],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

  user = { name: 'Alex', age: 20 };

  changeName(): void {
    // Этот вариант не сработает из-за того что он данная запись не изменяет ссылку на объект и для Angular'a этот объект при строгом сравнений остаётся тем же и механизм обнаружения изменений не запуститься в данный компонент
    // this.user.name = 'Eugene';

    // Данная запись обновляет ссылку объекта и поэтому стратегия обнаружения сработает
    this.user = { ...this.user, name: 'Eugene' };
  }

}