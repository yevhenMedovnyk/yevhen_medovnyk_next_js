'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import s from './orderStatus.module.scss';
import { useFetchClient } from '@/hooks/useFetchClient';
import { useCartStore } from '@/stores/useCartStore';

interface OrderData {
	result: {
		generalStatus: string;
		basket_id: string;
	};
}

const OrderStatus = () => {
	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const fetchClient = useFetchClient();
	const clearCart = useCartStore((state) => state.clearCart);

	useEffect(() => {
		const orderRef = Cookies.get('last_order_ref');
		if (!orderRef) return;

		(async () => {
			try {
				const res = await fetchClient(`/api/checkout/order?order_ref=${orderRef}`);
				setOrderData(res);

				if (res?.result?.generalStatus === 'success') {
					clearCart();
				}
			} catch (error) {
				console.error('Помилка при завантаженні замовлення:', error);
			}
		})();
	}, [fetchClient, clearCart]);

	if (!orderData) {
		return <div className={s.container}>Завантаження...</div>;
	}

	const { generalStatus, basket_id } = orderData.result;
	const isOrderSuccess = generalStatus === 'success';

	return (
		<div className={s.container}>
			{isOrderSuccess ? (
				<>
					<img src="/order-status/paper_cat_icon.png" alt="paper_cat_icon" className={s.icon} />
					<span className={s.successText}>
						<br />
						Дякуємо!
						<br />
						<br />
						Замовлення №{basket_id}
						<br /> успішно прийняте!
					</span>
				</>
			) : (
				<div className={s.errorStatusContainer}>
					<img src="/404page/pirate_cat_icon.png" alt="404_image" className={s.icon} />
					<span className={s.errorStatusText}>Ууупс, щось пішло не так: {generalStatus}</span>
				</div>
			)}
			<Link className={s.backLink} href="/store">
				Повернутись до магазину
			</Link>
		</div>
	);
};

export default OrderStatus;
