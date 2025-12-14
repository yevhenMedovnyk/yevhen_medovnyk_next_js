import React from 'react';
import s from './delivery.module.scss';
import parse from 'html-react-parser';
import { getLocale } from 'next-intl/server';
import { IDeliveryAndPayment } from '@/types/IDeliveryAndPayment';

export async function getDeliveryAndPaymentInfo() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/delivery-and-payment`, {
			next: { revalidate: 3600, tags: ['DeliveryAndPayment'] },
		});

		return res.json();
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

const DeliveryAndPayment = async () => {
	const deliveryAndPaymentInfo = await getDeliveryAndPaymentInfo();
	const locale = await getLocale();

	const currentLocale = locale as keyof IDeliveryAndPayment['content'];

	return (
		<div className={s.container}>
			{deliveryAndPaymentInfo?.content[currentLocale]
				? parse(deliveryAndPaymentInfo.content[currentLocale])
				: null}
		</div>
	);
};

export default DeliveryAndPayment;
