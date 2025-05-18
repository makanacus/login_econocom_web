import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateService } from '../../services/translate/translate.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showPassword = false;
  selectedLanguage = 'es';
  successMessage: string | null = null;
  token: string | null = null;
  emailErrorMsg: string | null = null;
  passwordErrorMsg: string | null = null;
  showWarning = false;
  warningTimeout: any;
  registre: string | null = null;

  private langSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private translateService: TranslateService,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.selectedLanguage = this.translateService.getCurrentLanguage();
    this.translateService.loadTranslations(this.selectedLanguage);

    this.langSub = this.translateService.langChange$.subscribe(lang => {
      this.selectedLanguage = lang;
    });

    this.registre = 'registre';

    this.route.queryParams.subscribe(params => {
    if (params['sso'] === 'true' && params['token']) {
      this.successMessage = 'login.ssoSuccess';
      this.token = params['token'];
    }
});
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLanguageChange(lang: string) {
    if (lang !== this.selectedLanguage) {
      this.translateService.setLanguage(lang);
    }
  }

  showWarningMessage(event: Event): void {
    event.preventDefault();

    this.showWarning = true;

    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
    }

    this.warningTimeout = setTimeout(() => {
      this.showWarning = false;
    }, 3000);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.emailErrorMsg = null;
    this.passwordErrorMsg = null;
    this.successMessage = null;
    this.token = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'login.success';
        this.token = response.token;
      },
      error: (err) => {
        if (err.status === 0) {
          this.emailErrorMsg = 'login.serverUnavailable';
          this.warningTimeout = setTimeout(() => {
          this.emailErrorMsg = null;
          }, 3000);
          return;
        }

        const message = err.error?.message || '';
        const key = this.mapErrorMessage(message);

        if (message.includes('Contraseña')) {
          this.passwordErrorMsg = key;
          this.password.setErrors({ server: true });
        } else if (message.includes('Usuario')) {
          this.emailErrorMsg = key;
          this.email.setErrors({ server: true });
        }
      }
    });
  }

  private mapErrorMessage(message: string): string {
    const translations: { [key: string]: string } = {
      'Usuario no encontrado': 'login.invalidUser',
      'Contraseña inválida': 'login.invalidPassword'
    };
    return translations[message] || message;
  }

  
  startSSOLogin(): void {
    this.authService.checkSSOServer().subscribe({
      next: () => {
        window.location.href = 'http://localhost:8080/api/auth/sso';
      },
      error: () => {
        this.emailErrorMsg = 'login.serverUnavailable';
        this.warningTimeout = setTimeout(() => {
        this.emailErrorMsg = null;
        }, 3000);
      }
    });
  }

}
