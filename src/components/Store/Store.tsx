'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import StoreItem from '@/components/StoreItem/StoreItem';
import { IProduct } from '@/types/IProduct';
import s from './Store.module.scss';
import { ClipLoader } from 'react-spinners';

interface Props {
	productsMinimal: Pick<IProduct, '_id' | 'slug' | 'name' | 'imgs'>[];
}

const Store: React.FC<Props> = ({ productsMinimal }) => {
	const [loadedProducts, setLoadedProducts] = useState<IProduct[]>([]);
	const [loadIndex, setLoadIndex] = useState(0);
	const [isFetching, setIsFetching] = useState(false);

	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: false,
	});

	console.log("loadedProducts",loadedProducts);
	

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
		if (inView && !isFetching && loadIndex < productsMinimal.length) {
			setIsFetching(true);
			const slug = productsMinimal[loadIndex].slug;
			fetchProductDetails(slug).then((fullProduct) => {
				if (fullProduct) {
					setLoadedProducts((prev) => [...prev, fullProduct]);
					setLoadIndex((idx) => idx + 1);
				}
				setIsFetching(false);
			});
		}
	}, [inView, isFetching, loadIndex, productsMinimal, fetchProductDetails]);

	return (
		<div className={s.storeContainer}>
			{loadedProducts.map((product) => (
				<StoreItem key={product._id} product={product} />
			))}

			{loadIndex < productsMinimal.length && (
				<div ref={ref} className="spinnerWrapper">
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			)}
		</div>
	);
};

export default Store;
