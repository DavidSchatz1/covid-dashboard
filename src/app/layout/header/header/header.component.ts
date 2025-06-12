import { Component } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';
import { HeaderFields } from 'src/assets/data/keys/header-data.keys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  HeaderFields = HeaderFields
  currentLang: 'he' | 'en' = 'he';
  isDarkMode = false;
  showLanguageMenu = false;

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang as 'he' | 'en';
    });
  }

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

   setLanguage(lang: 'he' | 'en'): void {
    if (lang !== this.currentLang) {
      this.translationService.switchLanguage(lang);
    }
    this.showLanguageMenu = false;
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
