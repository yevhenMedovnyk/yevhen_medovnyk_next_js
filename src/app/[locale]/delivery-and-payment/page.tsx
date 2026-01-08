import React from 'react';
import s from './delivery.module.scss';
import parse from 'html-react-parser';
import { getLocale } from 'next-intl/server';
import { IDeliveryAndPayment } from '@/types/IDeliveryAndPayment';
import { getDeliveryAndPaymentFromDB } from '@/lib/deliveryAndPayment';


const DeliveryAndPayment = async () => {
	const deliveryAndPaymentInfo = await getDeliveryAndPaymentFromDB();
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
