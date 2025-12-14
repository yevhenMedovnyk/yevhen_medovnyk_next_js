import mongoose, { Schema, Document, Model } from 'mongoose';

interface IProduct {
	code_product: string;
	name: string;
	cnt: number;
	price: number;
	product_img_src: string;
}

interface IClientInfo {
	first_name: string;
	last_name: string;
	phoneNumber: string;
	email: string;
}

interface IDeliveryRecipientInfo {
	first_name: string;
	last_name: string;
	phoneNumber: string;
	email?: string;
}

export interface IOrder extends Document {
	orderId: string;
	basket_id: string;
	generalStatus: string;
	dateCreate: string;
	delivery_method_desc: string;
	deliveryRecipientInfo: IDeliveryRecipientInfo;
	delivery_branch_address: string;
	mainClientInfo: IClientInfo;
	products: IProduct[];
	amount: number;
	clientCallback?: boolean;
	comment?: string;
	tracking_number?: number;
}

const productSchema = new Schema<IProduct>({
	code_product: { type: String, required: true },
	name: { type: String, required: true },
	cnt: { type: Number, required: true },
	price: { type: Number, required: true },
	product_img_src: { type: String, required: true },
});

const clientInfoSchema = new Schema<IClientInfo>({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	email: { type: String, required: true },
});

const deliveryRecipientInfoSchema = new Schema<IDeliveryRecipientInfo>({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	email: { type: String, required: false },
});

const orderSchema = new Schema<IOrder>({
	orderId: { type: String, required: true },
	basket_id: { type: String, required: true },
	generalStatus: { type: String, required: true },
	dateCreate: { type: String, required: true },
	delivery_method_desc: { type: String, required: true },
	deliveryRecipientInfo: { type: deliveryRecipientInfoSchema, required: true },
	delivery_branch_address: { type: String, required: true },
	mainClientInfo: { type: clientInfoSchema, required: true },
	products: [productSchema],
	amount: { type: Number, required: true },
	clientCallback: { type: Boolean, required: false },
	comment: { type: String, required: false },
	tracking_number: { type: Number, required: false },
});

// Кешування моделі для запобігання помилок при гарячому перезавантаженні (HMR)
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
