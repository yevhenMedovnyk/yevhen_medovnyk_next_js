"use client";

import React from 'react';
import s from './store.module.scss';
import StoreItem from '@/components/StoreItem/StoreItem';
import { useGetProductsQuery } from '../../redux/storeApi';
import { ClipLoader } from 'react-spinners';

const Store: React.FC = () => {
	const { data: products, isLoading } = useGetProductsQuery();

	if (isLoading) {
		return (
			<div className={s.spinnerWrapper}>
				<ClipLoader color="#b0bab8" size={50} />
			</div>
		);
	}

	return (
		<div className={s.storeContainer}>
			{products?.map((product) => <StoreItem key={product._id} product={product} />)}
		</div>
	);
};

export default Store;
