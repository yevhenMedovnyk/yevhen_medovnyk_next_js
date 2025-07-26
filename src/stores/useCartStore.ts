import { ICartItem } from '@/types/ICartItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistStorage } from './persistConfig';

interface CartState {
	items: ICartItem[];
	hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
	addToCart: (product: ICartItem) => void;
	removeFromCart: (id: number) => void;
	decreaseQuantity: (id: number) => void;
	increaseQuantity: (id: number) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			hasHydrated: false,
			setHasHydrated: (state) => set({ hasHydrated: state }),
			addToCart: (product) =>
				set((state) => ({
					items: [...state.items, product],
				})),
			removeFromCart: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item._id !== id),
				})),
			decreaseQuantity: (id) =>
				set((state) => ({
					items: state.items.map((item) =>
						item._id === id ? { ...item, quantity_in_cart: item.quantity_in_cart - 1 } : item
					),
				})),
			increaseQuantity: (id) =>
				set((state) => ({
					items: state.items.map((item) =>
						item._id === id ? { ...item, quantity_in_cart: item.quantity_in_cart + 1 } : item
					),
				})),
			clearCart: () => set({ items: [] }),
		}),
		{
			name: 'cart-storage',
			storage: createPersistStorage<CartState>(),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);
