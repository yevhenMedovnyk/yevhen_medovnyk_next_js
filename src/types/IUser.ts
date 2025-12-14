export interface IUser {
	name: string;
	email: string;
	image?: string;
	role: 'user' | 'admin';
	createdAt: Date;
}
