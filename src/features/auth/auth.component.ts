import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { MessageService } from '../../service/message.service';
import { LoaderService } from '../../service/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslateComponent } from '../../language-buttons/language-buttons.component';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, TranslatePipe, TranslateComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private translate: TranslateService = inject(TranslateService);

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  username!: string;

  authForm: FormGroup = this.fb.group({
    username: ['emilys', Validators.required],
    password: ['emilyspass', Validators.required]
  });

  onAuthForm(): void {
    if (this.authForm.valid) {
      this.loaderService.showLoader();

      this.authService.login(this.authForm.value)
        .pipe(
          tap(() => {
            this.router.navigate(['']);
            this.messageService.showInfo(this.translate.instant('auth.loginSuccess'));
          }),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showError(this.translate.instant('auth.loginError'));
            return throwError(() => error);
          }),
          finalize(() => this.loaderService.hideLoader())
        ).subscribe();
    } else {
      this.messageService.showError(this.translate.instant('usersPage.createUser.invalid'));
    }
  }

}