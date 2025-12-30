import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseApp } from './firebase';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FcmService {

  // 🔥 Firebase messaging instance
  private messaging = getMessaging(firebaseApp);

  // 🔁 Observable to share notification with components
  private messageSource = new Subject<any>();
  message$ = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  // 🔐 Request permission + get token + save to DB
  initFCM(adminId: number): void {

    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        console.warn('Notification permission denied');
        return;
      }

      getToken(this.messaging, {
        vapidKey: 'BAmWYyepbJDiSnNCjFSpl_nRLhLKD--Cl6Tl60_xxISynRR49lbcpkgum7vv515fCbN7rpOdvCsxLkrXCSDZxRg'
      })
        .then(token => {
          if (!token) {
            console.warn('No FCM token received');
            return;
          }
          // 💾 Save token to backend
          this.http.post(
            'https://ruralx.in/api/save_fcm_token.php',
            {
              user_id: adminId,
              token: token,
              platform: 'web',
              device_type: 'Chrome'
            }
          ).subscribe({
            next: res => console.log('FCM token saved', res),
            error: err => console.error('FCM save failed', err)
          });
        })
        .catch(err => console.error('FCM getToken error', err));
    });
  }

  // Listen foreground notifications
  listenMessages(): void {
    onMessage(this.messaging, payload => {
      // ✅ emit to subscribed components
      this.messageSource.next(payload);
    });
  }
}
