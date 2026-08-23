import { Component, inject } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { ChangeDetectionComponentOne } from '../change-detection-one/change-detection-one.component';
import { ChangeDetectionComponentTwo } from '../change-detection-two/change-detection-two.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-parent',
  imports: [
    ChildComponent,
    ChangeDetectionComponentOne,
    ChangeDetectionComponentTwo,
    TranslatePipe,
  ],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  user = { name: 'Alex', age: 20 };
  private translate: TranslateService = inject(TranslateService);

  onChangeName(): void {
    this.user = {
      ...this.user,
      name: this.translate.instant('homework.changeName'),
    };
  }
}
