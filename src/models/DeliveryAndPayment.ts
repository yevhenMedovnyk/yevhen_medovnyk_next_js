import mongoose, { Model, Schema } from 'mongoose';

interface IDeliveryAndPayment {
	content: string;
}

const DeliveryAndPaymentSchema = new Schema<IDeliveryAndPayment>({
	content: { type: String, required: true },
});

const DeliveryAndPayment: Model<IDeliveryAndPayment> =
	mongoose.models.delivery_and_payment ||
	mongoose.model<IDeliveryAndPayment>('delivery_and_payment', DeliveryAndPaymentSchema);

export default DeliveryAndPayment;
