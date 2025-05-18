import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importante para formularios
import { RouterModule } from '@angular/router'; // Para rutas

// Importa tu componente Login
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SsoCallbackComponent } from './sso-callback/sso-callback.component';

@NgModule({
  declarations: [
    LoginComponent,
    SsoCallbackComponent 
  ],
  imports: [
    // Módulos de Angular Material
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule, 
    RouterModule.forChild([ 
      { path: 'login', component: LoginComponent }
    ])
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }