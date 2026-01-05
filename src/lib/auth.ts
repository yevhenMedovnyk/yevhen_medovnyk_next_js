import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async jwt({ token, user }) {
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

		async session({ session, token }) {
			if (session.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
};
