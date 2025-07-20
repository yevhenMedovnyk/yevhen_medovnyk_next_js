'use client';

import React from 'react';
import s from './Store.module.scss';
import StoreItem from '@/components/StoreItem/StoreItem';
import { IProduct } from '@/types/IProduct';

interface Props {
	products: IProduct[];
}

const Store: React.FC <Props> = ({products}) => {

	return (
		<div className={s.storeContainer}>
			{products?.map((product) => (
				<StoreItem key={product._id} product={product} />
			))}
		</div>
	);
};

export default Store;
