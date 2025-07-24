import { IUser } from '@/types/IUser';
import { create } from 'zustand';

interface AuthState {
	items: IUser | null;
	setUser: (user: IUser) => void;
	clearUser: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
	items: null,
	setUser: (user) => set({ items: user }),
	clearUser: () => set({ items: null }),
}));
