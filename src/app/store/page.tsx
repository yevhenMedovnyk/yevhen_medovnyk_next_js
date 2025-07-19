'use client';

import React, { useEffect } from 'react';
import s from './store.module.scss';
import StoreItem from '@/components/StoreItem/StoreItem';
import { ClipLoader } from 'react-spinners';
import { IProduct } from '@/types/IProduct';

const Store: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [products, setProducts] = React.useState<IProduct[] | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('/api/store/products');
				const data = await response.json();
				setProducts(data);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching products:', error);
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (isLoading) {
		return (
			<div className={s.spinnerWrapper}>
				<ClipLoader color="#b0bab8" size={50} />
			</div>
		);
	}

	return (
		<div className={s.storeContainer}>
			{products?.map((product) => (
				<StoreItem key={product._id} product={product} />
			))}
		</div>
	);
};

export default Store;
