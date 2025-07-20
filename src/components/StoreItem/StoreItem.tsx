import React from 'react';
import clsx from 'clsx';
import Swiper from '../Swiper/Swiper';
import s from './StoreItem.module.scss';
import { IProduct } from '../../types/IProduct';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton/AddToCartButton';

interface IStoreItemProps {
	product: IProduct;
	full_page?: boolean;
}

const StoreItem: React.FC<IStoreItemProps> = ({ product, full_page = false }) => {
	const renderImageSection = () => {
		return full_page ? (
			<div className={s.imgContainer}>
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					slidesPerGroup={1}
					loop={false}
					images={product.imgs}
				/>
			</div>
		) : (
			<Link href={`/store/${product.slug}`} className={s.imgContainer}>
				<img
					className={s.img}
					src={product.imgs[0]?.img}
					alt={`Зображення товару: ${product.name}`}
				/>
			</Link>
		);
	};

	return (
		<div className={clsx(s.StoreItemContainer, full_page && s.fullPage)}>
			{renderImageSection()}
			{product && (
				<div className={clsx(s.textWrapper, full_page && s.fullPage)}>
					{full_page ? (
						<h2 className={s.name}>{product?.name}</h2>
					) : (
						<Link href={`/store/${product?.slug}`}>
							<h2 className={s.name}>{product?.name}</h2>
						</Link>
					)}
					{full_page && (
						<>
							<p className={s.isFramed}>
								Оформлення: <span>Без рами</span>
							</p>
							<span className={s.price}>{product?.price} грн</span>
						</>
					)}
					<div className={s.printInfo}>
						{full_page && <p className={s.paperInfo}>{product?.paper_info}</p>}
						{full_page && <p className={s.size_with_borders}>{product?.size_with_borders}</p>}
						{full_page && (
							<>
								<p className={s.size_without_borders}>{product?.size_without_borders}</p>
								<p className={s.captured_info}>{product?.captured_info}</p>
							</>
						)}
					</div>
					{full_page && <p className={s.note}>{product?.note}</p>}
					{!full_page && (
						<span className={s.price}>{product?.price && `${product.price} грн`}</span>
					)}
					{full_page && product && <AddToCartButton product={product} />}
				</div>
			)}
		</div>
	);
};

export default StoreItem;
