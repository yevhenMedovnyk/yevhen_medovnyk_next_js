import React from 'react';
import s from './CartItem.module.scss';
import { ICartItem } from '../../types/ICartItem';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';
import clsx from 'clsx';
import Link from 'next/link';

interface ICartItemProps {
	item: ICartItem;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
}

const CartItem: React.FC<ICartItemProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
	const { imgs, name, selectedPrice: price, selectedSize: size, quantity_in_cart, slug } = item;
	const itemTotal = price * quantity_in_cart;

	return (
		<div className={s.container}>
			<Link href={`/store/${slug}`} className={s.img}>
				<img src={imgs[0].img} alt={name.ua} />
			</Link>
			<div className={s.content}>
				<div className={s.info}>
					<h1 className={s.name}>{name.en}</h1>
					<span className={s.size}>{size}</span>
					<div className={s.quantityContainer}>
						<FiMinus
							className={clsx(s.minusBtn, quantity_in_cart === 1 && s.disabled)}
							onClick={onDecrease}
						/>
						<div className={s.quantityInputFake}>{quantity_in_cart}</div>
						<FiPlus className={s.plusBtn} onClick={onIncrease} />
					</div>
				</div>

				<div className={s.itemTotal}>{itemTotal} грн</div>
				<button className={s.btn} onClick={onRemove}>
					<AiOutlineCloseCircle />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
