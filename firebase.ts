'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfigEnv = (() => {
	try {
		return JSON.parse(process.env.NEXT_PUBLIC_FIREBASE || '{}');
	} catch (e) {
		console.error('Invalid NEXT_PUBLIC_FIREBASE JSON:', e);
		return {};
	}
})();

const firebaseConfig = {
	apiKey: firebaseConfigEnv.firebase_api_key,
	authDomain: firebaseConfigEnv.firebase_auth_domain,
	projectId: firebaseConfigEnv.firebase_project_id,
	messagingSenderId: firebaseConfigEnv.firebase_messaging_sender_id,
	appId: firebaseConfigEnv.firebase_app_id,
	storageBucket: firebaseConfigEnv.firebase_storage_bucket,
};

// ініціалізуємо один раз
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
