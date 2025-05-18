import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatePipe } from './pipes/translate.pipe';
import { IdiomaSelectorComponent } from './idioma-selector/idioma-selector.component';

@NgModule({
  declarations: [
    // Declara ambos elementos
    IdiomaSelectorComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IdiomaSelectorComponent,
    TranslatePipe,
    CommonModule
  ]
})
export class SharedModule { }