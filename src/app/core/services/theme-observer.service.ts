import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeObserverService {
  constructor(private zone: NgZone) {}

  /**
   * Emits an event when body class changes (e.g., dark mode toggle)
   */
  observeBodyClassChanges(): Observable<void> {
    return new Observable<void>((observer) => {
      const observerInstance = new MutationObserver(() => {
        this.zone.run(() => {
          observer.next();
        });
      });

      observerInstance.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => observerInstance.disconnect(); // Clean up on unsubscribe
    });
  }
}
