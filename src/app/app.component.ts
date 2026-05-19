import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { messaging } from './firebase';
import { environment } from '../environments/environment';
import { getToken, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main style="font-family: Arial; padding: 16px;">
      <h2>FCM Web Test</h2>

      <button (click)="enableNotifications()">
        Activar notificaciones y obtener token
      </button>

      <p><b>Permission:</b> {{ permission }}</p>

      <p><b>Token:</b></p>
      <textarea style="width:100%; height:120px;" readonly>{{ token }}</textarea>

      <hr />
      <h3>Último mensaje recibido (foreground)</h3>
      <pre>{{ lastMessage }}</pre>
    </main>
  `,
})
export class AppComponent implements OnInit {
  permission = typeof Notification !== 'undefined' ? Notification.permission : 'unsupported';
  token = '';
  lastMessage = '';

  ngOnInit(): void {
    // Mensajes con la web ABIERTA (foreground)
    onMessage(messaging, (payload) => {
      console.log('📩 Foreground message:', payload);
      this.lastMessage = JSON.stringify(payload, null, 2);

      // opcional: mostrar alert
      const title = payload?.notification?.title ?? 'Notificación';
      const body = payload?.notification?.body ?? '';
      alert(`${title}\n${body}`);
    });
  }

  async enableNotifications() {
    try {
      if (typeof Notification === 'undefined') {
        alert('Este navegador no soporta notificaciones.');
        return;
      }
      if (!('serviceWorker' in navigator)) {
        alert('Service Workers no disponibles en este navegador/contexto.');
        return;
      }

      const perm = await Notification.requestPermission();
      this.permission = perm;

      if (perm !== 'granted') {
        alert('Permiso NO concedido.');
        return;
      }

      // Importante: el SW debe estar accesible en /firebase-messaging-sw.js
      const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

      const t = await getToken(messaging, {
        vapidKey: environment.vapidKey,
        serviceWorkerRegistration: swReg,
      });

      if (!t) {
        alert('No se pudo obtener token (getToken devolvió vacío).');
        return;
      }

      this.token = t;
      console.log('✅ FCM Web Token:', t);
      alert('Token obtenido. Pégalo en Firebase Console para probar un envío.');
    } catch (e) {
      console.error('Error enableNotifications:', e);
      alert('Error al activar notificaciones. Mira consola.');
    }
  }
}




