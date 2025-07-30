import { create } from 'zustand';
import { IProductSize } from '@/types/IProduct';

interface ProductSizeItem extends IProductSize {
	productId: string;
}

interface ProductSizeState {
	items: ProductSizeItem[];
	setProductSize: (item: ProductSizeItem) => void;
}

export const useProductSize = create<ProductSizeState>((set) => ({
	items: [],
	setProductSize: (item) =>
		set((state) => {
			return { items: [item] };
		}),
}));
