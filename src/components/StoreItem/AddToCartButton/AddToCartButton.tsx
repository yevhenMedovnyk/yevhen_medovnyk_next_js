'use client';

import React from 'react';
import Button from '@/components/UI/Button/Button';
import { IProduct } from '@/types/IProduct';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import s from '../StoreItem.module.scss';
import { selectIsInCart } from '@/utils/cartSelectors';
import Link from 'next/link';

interface AddToCartButtonProps {
	product: IProduct;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const isInCart = useAppSelector(selectIsInCart(product._id));

	const handleAddToCart = () => {
		dispatch(addToCart(product));
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
