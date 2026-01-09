import DeliveryAndPayment from '@/models/DeliveryAndPayment';
import dbConnect from './dbConnect';
import { unstable_cache } from 'next/cache';

export const getDeliveryAndPaymentFromDB = unstable_cache(
	async () => {
		try {
			await dbConnect();
			const deliveryAndPayment = await DeliveryAndPayment.findOne({});
			return deliveryAndPayment;
		} catch (error: any) {
			console.error(error);
			return null;
		}
	},
	['delivery-and-payment'],
	{
		revalidate: 3600,
		tags: ['DeliveryAndPayment'],
	}
);
