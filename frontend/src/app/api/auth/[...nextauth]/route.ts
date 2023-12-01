import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/env.mjs';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			username: string;
			email: string;
			firstName: string;
			lastName: string;
			profileImageURL: string;
			headerImageURL: string;
			bio: string;
			city: string;
			country: string;
			customURL: string;
			memberSince: string;
			connectionsNumber: number;
			accessToken: string;
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'email@domain.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '********',
				},
			},
			authorize: (credentials) => {
				if (!credentials) return null;
				return {
					id: '1',
					username: 'wallq',
					email: 'sergio98@outlook.pt',
					firstName: 'Sérgio',
					lastName: 'Félix',
					profileImageURL:
						'https://avatars.githubusercontent.com/u/60108167',
					headerImageURL:
						'https://pbs.twimg.com/profile_banners/2904443818/1670360272',
					bio: '!false geek',
					city: 'Felgueiras',
					country: 'Portugal',
					customURL: 'https://twitter.com/xeno98g',
					memberSince: '2023-11-19T17:46:43.887Z',
					connectionsNumber: 0,
					accessToken: '6652990704591814',
				};
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => ({
			// if (account) {
			// 	token.accessToken = account.access_token
			// 	token.id = profile.id
			// }
			...token,
			...user,
		}),
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				...token,
			},
		}),
	},
	session: {
		strategy: 'jwt',
	},
	// pages: {
	// 	signIn: '/auth/sign-in',
	// 	newUser: '/auth/sign-up',
	// 	signOut: '/auth/sign-out',
	// },
	secret: env.NEXTAUTH_SECRET,
	useSecureCookies: env.NODE_ENV === 'production',
	debug: env.NODE_ENV === 'development',
};

export const getServerAuthSession = () => getServerSession(authOptions);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
