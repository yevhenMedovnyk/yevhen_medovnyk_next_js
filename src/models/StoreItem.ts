import { id } from './../../node_modules/next-auth/client/__tests__/helpers/mocks.d';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IImage {
	img?: string;
	name?: string;
	width?: number;
	height?: number;
}

export interface IStoreItem extends Document {
	code_product: number;
	name: {
		ua: string;
		en: string;
	};
	slug: string;
	imgs: IImage[];
	quantity?: number;
	isLimited: boolean;
	paper_info: {
		ua: string;
		en: string;
	};
	sizes: {
		id: string;
		label: string;
		price: number;
	}[];
	captured_info: {
		ua: string;
		en: string;
	};
	note: {
		ua: string;
		en: string;
	};
	frame: {
		ua: string;
		en: string;
	};
}

const imageSchema = new Schema<IImage>(
	{
		img: String,
		name: String,
		width: Number,
		height: Number,
	},
	{ _id: false }
);

const storeItemSchema = new Schema<IStoreItem>({
	code_product: { type: Number, required: true },
	name: { type: { ua: String, en: String }, required: true },
	slug: { type: String, required: true },
	imgs: { type: [imageSchema], default: [] },
	quantity: { type: Number, required: false },
	isLimited: { type: Boolean, required: true },
	paper_info: { type: { ua: String, en: String }, required: true },
	sizes: { type: [{ id: String, label: String, price: String }], required: true },
	captured_info: { type: { ua: String, en: String }, required: true },
	note: { type: { ua: String, en: String }, required: true },
	frame: { type: { ua: String, en: String }, required: true },
});

// Запобігаємо повторному визначенню моделі при гарячому перезавантаженні
const StoreItem: Model<IStoreItem> =
	mongoose.models.store_item || mongoose.model<IStoreItem>('store_item', storeItemSchema);

export default StoreItem;
