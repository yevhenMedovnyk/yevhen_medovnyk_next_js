'use client';

import React, { useEffect } from 'react';
import s from './cart.module.scss';
import { useCartItemCount, useCartTotal } from '@/stores/hooks/cartSelectors';
import CartItem from '@/components/CartItem/CartItem';
import Button from '@/components/UI/Button/Button';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useFetchClient } from '@/hooks/useFetchClient';
import { useCartStore } from '@/stores/useCartStore';
import { showErrorToast } from '@/components/UI/showErrorToast';
import { useLocale, useTranslations } from 'next-intl';
import { IProduct } from '@/types/IProduct';

const Cart = () => {
	const fetchClient = useFetchClient();

	const total = useCartTotal();
	const itemsCount = useCartItemCount();

	const t = useTranslations();
	const locale = useLocale();
	const currentLocale = locale as keyof IProduct['name'];

	useEffect(() => {
		document.title = t('Cart.meta.title');
		document
			.querySelector('meta[name="description"]')
			?.setAttribute('content', t('Cart.meta.description'));
	}, [t]);

	const {
		items: cartItems,
		increaseQuantity,
		decreaseQuantity,
		removeFromCart,
		hasHydrated,
	} = useCartStore((state) => state);

	const products = cartItems.map((item) => ({ ...item, name: item.name[currentLocale] }));

	const onClickBuy = async () => {
		const order_ref = Date.now().toString();
		const body = {
			order_ref: order_ref,
			amount: total,
			count: itemsCount,
			products,
			//"code_checkbox": "3315974",
		};

		try {
			const res = await fetchClient('/api/checkout', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(body),
			});
			Cookies.set('last_order_ref', order_ref, { expires: 1 });
			if (res.result.redirect_url) {
				window.location.assign(res.result.redirect_url);
			}
		} catch (error: any) {
			console.error('Помилка при створенні замовлення:', error);
			showErrorToast(t('Cart.errorMessage'));
		}
	};

	if (!hasHydrated) {
		return null;
	}

	return (
		<div className={s.cart}>
			{cartItems.length === 0 ? (
				<div className={s.emptyCart}>
					<img
						className={s.emptyCartIcon}
						src={'/cart/hungry_cat_icon.png'}
						alt="hungry_cat_icon"
					/>
					<h1 className={s.emptyCartTitle}>{t('Cart.emptyCart')}</h1>
					<Link className={s.emptyCartLink} href="/store">
						{t('Cart.backToStore')}
					</Link>
				</div>
			) : (
				<>
					{cartItems.map((item) => (
						<CartItem
							key={item._id + item.selectedSize}
							item={item}
							onIncrease={() => increaseQuantity(item._id, item.selectedSize)}
							onDecrease={() => decreaseQuantity(item._id, item.selectedSize)}
							onRemove={() => removeFromCart(item._id, item.selectedSize)}
						/>
					))}
					<div className={s.total}>
						<span>{t('Cart.totalPrice')}:</span>
						{total} {t('Currency.uah')}
					</div>
					<Button name={t('Cart.checkout')} onClick={() => onClickBuy()} class_name="cart" />
				</>
			)}
		</div>
	);
};

export default Cart;
