import React from 'react';
import clsx from 'clsx';
import s from './StoreItem.module.scss';
import { IProduct } from '../../types/IProduct';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface IStoreItemProps {
	product: IProduct;
}

const StoreItem = ({ product }: IStoreItemProps) => {
	const locale = useLocale();
	const currentLocale = locale as keyof IProduct['name'];
	const t = useTranslations('Currency');

	const renderImageSection = () => {
		return (
			<Link href={`/store/${product.slug}`} className={s.imgContainer}>
				<img
					className={s.img}
					src={product.imgs[0]?.img}
					alt={`Зображення товару: ${product.name[currentLocale]}`}
				/>
			</Link>
		);
	};

	return (
		<div className={clsx(s.StoreItemContainer)}>
			{renderImageSection()}
			{product && (
				<div className={clsx(s.textWrapper)}>
					<Link href={`/store/${product?.slug}`}>
						<h1 className={s.name}>{product?.name[currentLocale]}</h1>
					</Link>
					<span className={s.price}>{`${product.sizes[0].price} ${t('uah')}`}</span>
				</div>
			)}
		</div>
	);
};

export default StoreItem;
