import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth/next';

export interface IUser {
	id: string;
	name: string;
	email: string;
	image: string;
}

export interface IToken {
	name: string;
	email: string;
	picture: string;
	sub: string;
	role: 'user' | 'admin';
}

export interface ISession {
	user: {
		name: string;
		email: string;
		image: string;
		role: string;
	};
	expires: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, user }: { token: IToken; user?: IUser }) {
			await dbConnect();

			if (user?.email) {
				const userInDB = await User.findOne({ email: user.email });

				if (!userInDB) {
					await User.create({
						email: user.email,
						name: user.name,
						image: user.image,
						role: user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
						createdAt: new Date(),
					});

					token.role = user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
				} else {
					token.role = userInDB.role ?? 'user';
				}
			}

			return token;
		},

		async session({ session, token }: { session: ISession; token: IToken }) {
			if (session.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
};
