import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sso-callback',
  standalone: false,
  templateUrl: './sso-callback.component.html',
  styleUrl: './sso-callback.component.scss'
})
export class SsoCallbackComponent implements OnInit {
  loading = true;
  error: string | null = null;
  success: string | null = null;
  validate: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    this.validate = 'sso.validate';

    if (!code) {
      this.error = 'sso.missingCode';
      this.loading = false;
      return;
    }

    this.authService.ssoCallback(code).subscribe({
      next: (response) => {
        this.success = 'sso.authSuccess';

        this.loading = false;

        localStorage.setItem('token', response.token);

        setTimeout(() => {
          this.router.navigate(['/'], {
            queryParams: {
              sso: 'true',
              token: response.token
            }
          });
        }, 2000);
      },
      error: (err) => {
        this.error = 'sso.authError';
        this.loading = false;
      }
    });
  }

}
