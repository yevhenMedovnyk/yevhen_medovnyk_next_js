'use client';

import React, { useEffect } from 'react';
import s from './product.module.scss';
import StoreItem from '@/components/StoreItem/StoreItem';
import { IProduct } from '@/types/IProduct';
import { useAppDispatch } from '@/hooks/redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { showSuccessToast } from '@/components/UI/showSuccessToast';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchClient } from '@/utils/fetchClient';

const StoreItemPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const slug = params.product;

	const [isLoading, setIsLoading] = React.useState(true);
	const [product, setProduct] = React.useState<IProduct | null>(null);
	const [isError, setIsError] = React.useState(false);

	useEffect(() => {
		const fetchProduct = async() => {
			setIsLoading(true);
			try {
				const data = await fetchClient(`/api/store/${slug}`);
				setProduct(data);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching product:', error);
				setIsLoading(false);
				setIsError(true);
			}
		}
		fetchProduct();
	}, [slug]);


	if (!slug) return <div>Помилка: відсутній slug товару</div>;

	if (isLoading)
		return (
			<div className={s.spinnerWrapper}>
				<ClipLoader color="#b0bab8" size={50} />
			</div>
		);
	if (isError || !product) return <div>Помилка при завантаженні товару</div>;

	const handleAddToCart = (product: IProduct): void => {
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
		<div className={s.StoreItemPageContainer}>
			<StoreItem handleAddToCart={handleAddToCart} full_page product={product} />
		</div>
	);
};

export default StoreItemPage;
