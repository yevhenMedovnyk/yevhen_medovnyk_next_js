import { IPublicOffer } from '@/types/IPublicOffer';
import mongoose, { Model, Schema } from 'mongoose';

const PublicOfferSchema = new Schema<IPublicOffer>({
	content: {
		ua: { type: String, default: '' },
		en: { type: String, default: '' },
	},
});

const PublicOffer: Model<IPublicOffer> =
	mongoose.models.public_offer || mongoose.model<IPublicOffer>('public_offer', PublicOfferSchema);

export default PublicOffer;
