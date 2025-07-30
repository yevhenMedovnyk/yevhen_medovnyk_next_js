import React from 'react';
import clsx from 'clsx';
import Swiper from '../Swiper/Swiper';
import s from './StoreItem.module.scss';
import { IProduct } from '../../types/IProduct';
import AddToCartButton from './AddToCartButton/AddToCartButton';
import SizeSelector from './SizeSelector/SizeSelector';
import { getTranslations, getLocale } from 'next-intl/server';

interface IProductFullProps {
	product: IProduct;
}

const ProductFull = async ({ product }: IProductFullProps) => {
	const locale = getLocale();
	const currentLocale = (await locale) as keyof IProduct['name'];
	const t = await getTranslations('ProductFull');
	

	const renderImageSection = () => {
		return (
			<div className={s.imgContainer}>
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					slidesPerGroup={1}
					loop={false}
					images={product.imgs}
				/>
			</div>
		);
	};

	return (
		<div className={clsx(s.StoreItemContainer, s.fullPage)}>
			{renderImageSection()}
			{product && (
				<div className={clsx(s.textWrapper, s.fullPage)}>
					<h1 className={s.name}>{product?.name[currentLocale]}</h1>

					<div className={s.isFramed}>
						{t('framing')}: <span>{product?.frame[currentLocale]}</span>
						<SizeSelector sizes={product?.sizes} productId={product?._id} />
					</div>

					<div className={s.printInfo}>
						<p className={s.captured_info}>{product?.captured_info[currentLocale]}</p>
						<p className={s.paperInfo}>{product?.paper_info[currentLocale]}</p>
					</div>
					<p className={s.note}>{product?.note[currentLocale]}</p>
					{product && <AddToCartButton product={product} />}
				</div>
			)}
		</div>
	);
};

export default ProductFull;
