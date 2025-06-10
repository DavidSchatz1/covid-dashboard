import { Component } from '@angular/core';
import { sharedFields } from 'src/assets/data/keys/shared.keys';
import { ThemeObserverService } from 'src/app/core/services/theme-observer.service';


@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss']
})
export class MoreMenuComponent {
  isOpen = false;
  sharedFields = sharedFields;
  isDarkMode: boolean;

  constructor(private themeObserverService: ThemeObserverService) {
    this.themeObserverService.observeBodyClassChanges().subscribe(() => {
      this.isDarkMode = document.body.classList.contains('dark-mode');
    });
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
