import mongoose, { Schema, Document, Model } from 'mongoose';

interface IImage {
	img?: string;
	name?: string;
	width?: number;
	height?: number;
}

export interface IStoreItem extends Document {
	code_product: number;
	name: string;
	slug: string;
	imgs: IImage[];
	price: number;
	quantity?: number;
	isLimited: boolean;
	paper_info: string;
	size_with_borders: string;
	size_without_borders: string;
	captured_info: string;
	note: string;
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
	name: { type: String, required: true },
	slug: { type: String, required: true },
	imgs: { type: [imageSchema], default: [] },
	price: { type: Number, required: true },
	quantity: { type: Number, required: false },
	isLimited: { type: Boolean, required: true },
	paper_info: { type: String, required: true },
	size_with_borders: { type: String, required: true },
	size_without_borders: { type: String, required: true },
	captured_info: { type: String, required: true },
	note: { type: String, required: true },
});

// Запобігаємо повторному визначенню моделі при гарячому перезавантаженні
const StoreItem: Model<IStoreItem> =
	mongoose.models.store_item || mongoose.model<IStoreItem>('store_item', storeItemSchema);

export default StoreItem;
