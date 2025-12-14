import { ICartItem } from '@/types/ICartItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistStorage } from './persistConfig';

interface CartState {
	items: ICartItem[];
	hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
	addToCart: (product: ICartItem) => void;
	removeFromCart: (id: string, size: string) => void;
	decreaseQuantity: (id: string, size: string) => void;
	increaseQuantity: (id: string, size: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			hasHydrated: false,
			setHasHydrated: (state) => set({ hasHydrated: state }),
			addToCart: (product) =>
				set((state) => {
					const existingItem = state.items.find(
						(item) => item._id === product._id && item.selectedSize === product.selectedSize
					);

					if (existingItem) {
						return {
							items: state.items.map((item) => {
								if (item._id === product._id && item.selectedSize === product.selectedSize) {
									return { ...item, quantity_in_cart: item.quantity_in_cart + 1 };
								}
								return item;
							}),
						};
					} else {
						return {
							items: [...state.items, { ...product, quantity_in_cart: 1 }],
						};
					}
				}),

			removeFromCart: (id, size) =>
				set((state) => ({
					items: state.items.filter((item) => !(item._id === id && item.selectedSize === size)),
				})),
			decreaseQuantity: (id, size) =>
				set((state) => ({
					items: state.items.map((item) =>
						item._id === id && item.selectedSize === size
							? { ...item, quantity_in_cart: item.quantity_in_cart - 1 }
							: item
					),
				})),
			increaseQuantity: (id, size) =>
				set((state) => ({
					items: state.items.map((item) =>
						item._id === id && item.selectedSize === size
							? { ...item, quantity_in_cart: item.quantity_in_cart + 1 }
							: item
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
