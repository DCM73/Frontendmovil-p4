/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");


firebase.initializeApp({
  apiKey: "AIzaSyCLL8opldGHgezRfp-DosIhGNxyJt_5OxI",
  authDomain: "recibiendo-notificaciones-push.firebaseapp.com",
  databaseURL: "https://recibiendo-notificaciones-push-default-rtdb.firebaseio.com",
  projectId: "recibiendo-notificaciones-push",
  storageBucket: "recibiendo-notificaciones-push.firebasestorage.app",
  messagingSenderId: "105973429774",
  appId: "1:105973429774:web:6bdbe893486eef412a2e5f",
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const title = payload?.notification?.title || "Notificación";
  const options = {
    body: payload?.notification?.body || "",
    data: payload?.data || {},
    icon: "/favicon.ico",
  };

  self.registration.showNotification(title, options);
});


self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = "/"; // si quieres abrir una ruta concreta, cámbiala

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});

