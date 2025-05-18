import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';

@Component({
  selector: 'app-idioma-selector',
  standalone: false,
  templateUrl: './idioma-selector.component.html',
  styleUrl: './idioma-selector.component.scss'
})
export class IdiomaSelectorComponent {
  
  @Output() languageChanged = new EventEmitter<string>();
  
  selectedLanguage = 'es';

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.selectedLanguage = lang;
    this.languageChanged.emit(lang);
  }
}