// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCLL8opldGHgezRfp-DosIhGNxyJt_5OxI",
    authDomain: "recibiendo-notificaciones-push.firebaseapp.com",
    databaseURL: "https://recibiendo-notificaciones-push-default-rtdb.firebaseio.com", // opcional (solo si usas RTDB desde web)
    projectId: "recibiendo-notificaciones-push",
    storageBucket: "recibiendo-notificaciones-push.firebasestorage.app",
    messagingSenderId: "105973429774",
    appId: "1:105973429774:web:6bdbe893486eef412a2e5f",
  },
  // Para web push (FCM)
  vapidKey:
    "BEEnT4LcePF1Z7zABaoX8Q5xR2gdfv-c3oj9MpY61NxD2QZY2xbVYELKBdHgjFsP66XgBG2XRMdCai-xTQfgjUI",
};
