import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImageAlbum extends Document {
	name: {
		ua: string;
		en: string;
	};
	cover_img: string;
	category: string;
	slug: string;
	description?: {
		ua?: string;
		en?: string;
	};
}

const imageAlbumSchema = new Schema<IImageAlbum>({
	name: {
		ua: { type: String, required: true },
		en: { type: String, required: true },
	},
	cover_img: { type: String, required: true },
	category: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	description: {
		ua: { type: String },
		en: { type: String },
	},
});

// Кешуємо модель, щоб уникнути помилок при HMR (гарячому перезавантаженні)
const ImageAlbum: Model<IImageAlbum> =
	mongoose.models.image_album || mongoose.model<IImageAlbum>('image_album', imageAlbumSchema);

export default ImageAlbum;
