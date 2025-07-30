'use client';

import React from 'react';
import Button from '@/components/UI/Button/Button';
import { IProduct } from '@/types/IProduct';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import s from '../StoreItem.module.scss';
import { useIsInCart } from '@/stores/hooks/cartSelectors';
import Link from 'next/link';
import { useCartStore } from '@/stores/useCartStore';
import { useProductSize } from '@/stores/useProductSizeStore';

interface AddToCartButtonProps {
	product: IProduct;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
	const size = useProductSize((state) => state.items);


	const ProductData = {
		...product,
		quantity_in_cart: 1,
		selectedSize: size[0]?.label,
		selectedPrice: size[0]?.price,
	};

	const isInCart = useIsInCart(product._id);
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		addToCart(ProductData);
		showSuccessToast(
			'Товар додано!',
			<Link href="/cart" className={s.toastLink}>
				→ Перейти до кошика
			</Link>,
			5000
		);
	};

	return (
		<Button
			type="button"
			disabled={!product || isInCart}
			name={isInCart ? 'В кошику' : 'Додати до кошика'}
			onClick={handleAddToCart}
			class_name="storeItem"
		/>
	);
};

export default AddToCartButton;
