import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	role: 'user' | 'admin';
	image?: string;
	createdAt: Date;
}

const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	role: { type: String, required: true },
	image: { type: String },
	createdAt: { type: Date, default: Date.now },
});

// Кешування моделі для уникнення повторного визначення під час HMR
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
