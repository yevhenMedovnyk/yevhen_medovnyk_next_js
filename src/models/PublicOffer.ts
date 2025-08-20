import mongoose, { Model, Schema } from 'mongoose';

interface IPublicOffer {
	content: string;
}

const PublicOfferSchema = new Schema<IPublicOffer>({
	content: { type: String, required: true },
});

const PublicOffer: Model<IPublicOffer> =
	mongoose.models.public_offer || mongoose.model<IPublicOffer>('public_offer', PublicOfferSchema);

export default PublicOffer;
