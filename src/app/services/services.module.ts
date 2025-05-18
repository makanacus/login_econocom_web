import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { TranslateService } from './translate/translate.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthService,
    TranslateService
  ]
})
export class ServicesModule { }
