import { useCartStore } from '@/stores/useCartStore';

export const useCartItemCount = () => {
	const items = useCartStore((state) => state.items);
	return items.reduce((total, item) => total + item.quantity_in_cart, 0);
};

export const useCartTotal = () => {
	const items = useCartStore((state) => state.items);
	return items.reduce((total, item) => total + item.price * item.quantity_in_cart, 0);
};

export const useIsInCart = (productId: number) => {
	const items = useCartStore((state) => state.items);
	return items.some((item) => item._id === productId);
};

