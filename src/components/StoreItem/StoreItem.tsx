import React, { useMemo } from 'react';
import clsx from 'clsx';
import { ClipLoader } from 'react-spinners';
import Swiper from '../Swiper/Swiper';
import Button from '../UI/Button/Button';
import s from './StoreItem.module.scss';
import { IProduct } from '../../types/IProduct';
import { useAppSelector } from '../../hooks/redux';
import { selectIsInCart } from '@/utils/cartSelectors';
import Link from 'next/link';

interface IStoreItemProps {
	product: IProduct;
	full_page?: boolean;
	handleAddToCart?: (product: IProduct) => void;
}

const StoreItem: React.FC<IStoreItemProps> = ({ product, full_page = false, handleAddToCart }) => {
	const isInCart = useAppSelector(selectIsInCart(product?._id));

	const renderImageSection = useMemo(() => {
		if (!product || !product.imgs?.length) {
			return (
				<div className={s.placeholder} style={{ aspectRatio: '3 / 2' }}>
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			);
		}

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
			<Link href={`/store/${product._id}`} className={s.imgContainer}>
				<img className={s.img} src={product.imgs[0]?.img} alt={product.name} />
			</Link>
		);
	}, [product, full_page]);

	return (
		<div className={clsx(s.StoreItemContainer, full_page && s.fullPage)}>
			{renderImageSection}
			{product && (
				<div className={clsx(s.textWrapper, full_page && s.fullPage)}>
					{full_page ? (
						<h2 className={s.name}>{product?.name}</h2>
					) : (
						<Link href={`/store/${product?._id}`}>
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
						<span className={s.price}>
							{product?.price}
							{product?.price ? ' грн' : ''}
						</span>
					)}
					{full_page && product && handleAddToCart && (
						<Button
							type="button"
							disabled={!product || isInCart}
							name={isInCart ? 'Додано до кошика' : 'Додати до кошика'}
							onClick={() => handleAddToCart(product)}
							class_name="storeItem"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default StoreItem;
