import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
	displayName: string;
	email: string;
	uid: string;
	isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
	displayName: { type: String, required: true },
	email: { type: String, required: true },
	uid: { type: String, required: true },
	isAdmin: { type: Boolean, required: true },
});

// Кешування моделі для уникнення повторного визначення під час HMR
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
