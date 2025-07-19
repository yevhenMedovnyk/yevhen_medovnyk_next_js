"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import s from './orderStatus.module.scss';
import { fetchClient } from '@/utils/fetchClient';


interface OrderData {
	result: {
		generalStatus: string;
		basket_id: string;
	};
}


const OrderStatus = () => {
	const [orderRef, setOrderRef] = React.useState('');
	const [orderData, setOrderData] = React.useState<OrderData | null>(null);

	useEffect(() => {
		const orderRef = Cookies.get('last_order_ref');
		if (orderRef) {
			setOrderRef(orderRef);
		}
	}, []);


	useEffect(() => {
		const fetchOrder = async () => {
			const res = await fetchClient(`/api/checkout/order?order_ref=${orderRef}`);
			setOrderData(res);
		};
		if (orderRef) {
			fetchOrder();
		}
	}, [orderRef]);

	console.log('data', orderData);


	const generalStatus = orderData?.result?.generalStatus;
	const isOrderSuccess = generalStatus === 'success';
	
	if (!orderData) {
		return <div className={s.container}>Завантаження...</div>;
	}
	
	return (
		<div className={s.container}>
			{isOrderSuccess ? (
				<>
					{' '}
					<img src={'/order-status/paper_cat_icon.png'} alt="paper_cat_icon" className={s.icon} />
					<span className={s.successText}>
						Дякуємо!
						<br />
						Замовлення №{orderData?.result.basket_id}
						<br /> успішно прийняте!
					</span>
					<Link className={s.backLink} href="/store">
						Повернутись до магазину
					</Link>
				</>
			) : (
				<div className={s.errorStatusContainer}>
					<img className={s.icon} src={'/404page/pirate_cat_icon.png'} alt="404_image" />
					<span className={s.errorStatusText}>
						Ууупс, щось пішло не так: {orderData?.result.generalStatus}
					</span>
					<Link className={s.backLink} href="/store">
						Повернутись до магазину
					</Link>
				</div>
			)}
		</div>
	);
};

export default OrderStatus;
