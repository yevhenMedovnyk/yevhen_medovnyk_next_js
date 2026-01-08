import DeliveryAndPayment from '@/models/DeliveryAndPayment';
import dbConnect from './dbConnect';

export const getDeliveryAndPaymentFromDB = async () => {
	try {
		await dbConnect();
		const deliveryAndPayment = await DeliveryAndPayment.findOne({});
		return deliveryAndPayment;
	} catch (error: any) {
		console.error(error);
		return null;
	}
};
