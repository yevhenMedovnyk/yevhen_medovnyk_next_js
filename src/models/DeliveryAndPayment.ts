import mongoose, { Model, Schema } from 'mongoose';

interface IDeliveryAndPayment {
	content: {
		ua: string;
		en: string;
	};
}

const DeliveryAndPaymentSchema = new Schema<IDeliveryAndPayment>({
	content: {
		ua: { type: String, default: '' },
		en: { type: String, default: '' },
	},
});

const DeliveryAndPayment: Model<IDeliveryAndPayment> =
	mongoose.models.delivery_and_payment ||
	mongoose.model<IDeliveryAndPayment>('delivery_and_payment', DeliveryAndPaymentSchema);

export default DeliveryAndPayment;
