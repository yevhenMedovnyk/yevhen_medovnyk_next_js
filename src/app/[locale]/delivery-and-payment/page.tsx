import React from 'react';
import s from './delivery.module.scss';
import { Link } from '@/i18n/navigation';

const DeliveryAndPayment = () => {
	return (
		<div className={s.container}>
			<h1 className={s.title}>Доставка та оплата</h1>
			<p>
				<span>Оплата:</span> на сайті можна оплатити замовлення карткою, Apple Pay чи Google Pay за
				допомогою сервісу Mono Checkout від Monobank.
			</p>
			<p>
				<span>Доставка:</span> по Україні доставка здійснюється Новою Поштою безкоштовно. За кордон
				— через Укрпошту. Щоб замовити доставку за кордон, скористайтеся сторінкою{' '}
				<Link className={s.link} href="/contacts">
					«Контакти»{' '}
				</Link>
				.
			</p>
		</div>
	);
};

export default DeliveryAndPayment;
