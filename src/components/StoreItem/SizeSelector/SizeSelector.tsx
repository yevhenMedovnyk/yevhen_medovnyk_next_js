'use client';

import React, { useEffect } from 'react';
import s from './SizeSelector.module.scss';
import { useTranslations } from 'next-intl';

import { CgRadioCheck } from 'react-icons/cg';
import { CgRadioChecked } from 'react-icons/cg';
import { useProductSize } from '@/stores/useProductSizeStore';

interface ISizeSelectorProps {
	sizes: {
		id: string;
		label: string;
		price: number;
	}[];
	productId: string;
}

const SizeSelector: React.FC<ISizeSelectorProps> = ({ sizes, productId }) => {
	const { setProductSize } = useProductSize();
	const paperSizeId = useProductSize(
		(state) => state.items?.find((i) => i.productId === productId)?.id
	);

	const price = useProductSize(
		(state) => state.items.find((i) => i.productId === productId)?.price
	);

	const t = useTranslations('Currency');

	useEffect(() => {
		const defaultSize = sizes[0];
		setProductSize({
			productId,
			...defaultSize,
		});
	}, []);

	const handleProductSize = (key: string) => {
		const productSize = sizes.find((size) => size.id === key);

		if (productSize) {
			setProductSize({
				productId,
				...productSize,
			});
		}
	};

	return (
		<div className={s.container}>
			<span className={s.price}>
				{price} {t('uah')}
			</span>
			<div className={s.sizes}>
				{sizes.map(({ id: key, label: size }) => {
					return (
						<div className={s.size} onClick={() => handleProductSize(key)} key={key}>
							<span className={s.dot}>
								{paperSizeId === key ? <CgRadioChecked size={20} /> : <CgRadioCheck size={20} />}
							</span>
							<span className={s.size}>{size}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SizeSelector;
