'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './SizeSelector.module.scss';
import { useTranslations } from 'next-intl';

import { CgRadioCheck } from 'react-icons/cg';
import { CgRadioChecked } from 'react-icons/cg';



interface ISizeSelectorProps {
	sizes: {
		id: string;
		label: string;
		price: number;
	}[];
}

const SizeSelector: React.FC<ISizeSelectorProps> = ({ sizes }) => {
	const [paperSize, setPaperSize] = useState<string>(sizes[0].id.toString());
	const [price, setPrice] = useState<number>(sizes[0].price);

	const t = useTranslations('Currency');

	useEffect(() => {
		setPrice(sizes.find((size) => size.id === paperSize)?.price ?? 0);
	}, [paperSize]);

	return (
		<div className={s.container}>
			<span className={s.price}>
				{price} {t('uah')}
			</span>
			<div className={s.sizes}>
				{sizes.map(({ id: key, label: size }) => {
					return (
						<div className={s.size} onClick={() => setPaperSize(key)} key={key}>
							<span className={s.dot}>
								{paperSize === key ? <CgRadioChecked size={20} /> : <CgRadioCheck size={20} />}
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
