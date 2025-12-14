import { StateStorage, createJSONStorage } from 'zustand/middleware';

export const zustandStorage: StateStorage = {
	getItem: (name) => {
		if (typeof window === 'undefined') return null;
		const item = localStorage.getItem(name);
		return item ?? null; // Повертаємо рядок або null
	},
	setItem: (name, value) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(name, value);
		}
	},
	removeItem: (name) => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(name);
		}
	},
};


export const createPersistStorage = <T>() => createJSONStorage<T>(() => localStorage);
