import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  constructor() { }

 private settings = {
    necessary: true,
    analytics: false,
    marketing: false
  };

  getSettings() {
    return this.settings;
  }

  acceptAll() {
    this.settings.analytics = true;
    this.settings.marketing = true;
    this.saveSettings();
  }

  rejectNonEssential() {
    this.settings.analytics = false;
    this.settings.marketing = false;
    this.saveSettings();
  }

  private saveSettings() {
    localStorage.setItem('privacySettings', JSON.stringify(this.settings));
    localStorage.setItem('privacyAccepted', 'true');
    // Implement cookie logic (e.g., Google Tag Manager) here.
  }

  hasUserResponded(): boolean {
    return !!localStorage.getItem('privacyAccepted');
  }
}
