import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage extends Document {
	img: string;
	name: string;
	album_id: string;
	album_slug: string;
	width: number;
	height: number;
	description?: {
		ua?: string;
		en?: string;
	};
}

const imageSchema = new Schema<IImage>({
	img: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	album_id: {
		type: String,
		required: true,
	},
	album_slug: {
		type: String,
		required: true,
	},
	width: {
		type: Number,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	description: {
		ua: { type: String },
		en: { type: String },
	},
});

// Використовуємо кешування, щоб уникнути помилок під час hot reload у dev
const Image: Model<IImage> = mongoose.models.Image || mongoose.model<IImage>('Image', imageSchema);

export default Image;
