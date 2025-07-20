'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import StoreItem from '@/components/StoreItem/StoreItem';
import { IProduct } from '@/types/IProduct';
import s from './Store.module.scss';

interface Props {
	productsMinimal: Pick<IProduct, '_id' | 'slug' | 'name' | 'imgs'>[];
}

const Store: React.FC<Props> = ({ productsMinimal }) => {
	const [loadedProducts, setLoadedProducts] = useState<IProduct[]>([]);
	const [loadIndex, setLoadIndex] = useState(0);

	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const fetchProductDetails = useCallback(async (slug: string): Promise<IProduct | null> => {
		try {
			const res = await fetch(`/api/store/${slug}`);
			if (!res.ok) return null;
			return await res.json();
		} catch {
			return null;
		}
	}, []);

	useEffect(() => {
		if (inView && loadIndex < productsMinimal.length) {
			// Завантажуємо наступний продукт
			const slug = productsMinimal[loadIndex].slug;
			fetchProductDetails(slug).then((fullProduct) => {
				if (fullProduct) {
					setLoadedProducts((prev) => [...prev, fullProduct]);
					setLoadIndex((idx) => idx + 1);
				}
			});
		}
	}, [inView, loadIndex, productsMinimal, fetchProductDetails]);

	
	

	return (
		<div className={s.storeContainer}>
			{loadedProducts.map((product) => (
				<StoreItem key={product._id} product={product} />
			))}

			{loadIndex < productsMinimal.length && <div ref={ref} style={{ height: 1 }} />}
		</div>
	);
};

export default Store;
