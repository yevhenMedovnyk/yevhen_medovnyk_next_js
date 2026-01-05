'use client';

import React from 'react';
import Button from '@/components/UI/Button/Button';
import { IProduct } from '@/types/IProduct';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import s from '../StoreItem.module.scss';
import Link from 'next/link';
import { useCartStore } from '@/stores/useCartStore';
import { useProductSize } from '@/stores/useProductSizeStore';
import { useTranslations } from 'next-intl';

interface AddToCartButtonProps {
	product: IProduct;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
	const size = useProductSize((state) => state.items);
	const t = useTranslations('ProductFull');

	const ProductData = {
		...product,
		quantity_in_cart: 1,
		selectedSize: size[0]?.label,
		selectedPrice: size[0]?.price,
	};

	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		addToCart(ProductData);
		showSuccessToast(
			t('addToCartSuccess'),
			<Link href="/cart" className={s.toastLink}>
				{t('goToCart')}
			</Link>,
			5000
		);
	};

	return (
		<Button type="button" name={t('addToCart')} onClick={handleAddToCart} class_name="storeItem" />
	);
};

export default AddToCartButton;
