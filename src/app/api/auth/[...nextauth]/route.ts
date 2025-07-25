import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token }) {
			await dbConnect();

			const userInDB = await User.findOne({ email: token.email });

			if (!userInDB) {
				await User.insertOne({
					email: token.email,
					name: token.name,
					image: token.picture,
					role: token.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
					createdAt: new Date(),
				});
				token.role = token.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
			} else {
				token.role = userInDB.role || 'user';
			}

			return token;
		},
		async session({ session, token }) {
			session.user.role = token.role as string;
			return session;
		},
	},
});

export const GET = handler;
export const POST = handler;
