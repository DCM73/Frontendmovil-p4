// src/app/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { environment } from '../environments/environment';

const app = initializeApp(environment.firebase);
export const messaging = getMessaging(app);
