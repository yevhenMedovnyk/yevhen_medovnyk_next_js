import mongoose, { Model, Schema } from 'mongoose';

interface IPrivacyPolicy {
	content: {
		ua: string;
		en: string;
	};
}

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>({
	content: {
		ua: { type: String, default: '' },
		en: { type: String, default: '' },
	},
});

const PrivacyPolicy: Model<IPrivacyPolicy> =
	mongoose.models.privacy_policy ||
	mongoose.model<IPrivacyPolicy>('privacy_policy', PrivacyPolicySchema);

export default PrivacyPolicy;
