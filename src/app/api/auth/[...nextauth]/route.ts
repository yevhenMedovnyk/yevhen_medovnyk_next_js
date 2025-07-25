import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import NextAuth, { NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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

			if (user) {
				// Перший раз після логіну
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
					token.role = userInDB.role || 'user';
				}
			}
			return token;
		},
		async session({ session, token }) {
			// @ts-ignore
			session.user.role = token.role as string;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
