import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/componets.module';

@NgModule({
 declarations: [
    AppComponent,
  ],
  imports: [
    // Módulos básicos de Angular
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    // Módulos de la aplicación
    ServicesModule,
    AuthModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
