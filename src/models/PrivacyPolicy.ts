import mongoose, { Model, Schema } from 'mongoose';

interface IPrivacyPolicy {
	content: string;
}

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>({
	content: { type: String, required: true },
});

const PrivacyPolicy: Model<IPrivacyPolicy> =
	mongoose.models.privacy_policy ||
	mongoose.model<IPrivacyPolicy>('privacy_policy', PrivacyPolicySchema);

export default PrivacyPolicy;
