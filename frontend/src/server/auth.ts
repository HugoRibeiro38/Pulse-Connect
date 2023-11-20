import {
	type DefaultSession,
	getServerSession,
	type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/env.mjs';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			username: string;
			email: string;
			firstName: string;
			lastName: string;
			image: string;
			banner: string;
			bio: string;
			city: string;
			country: string;
			url: string;
			createdAt: string;
			acessToken: string;
		} & DefaultSession['user'];
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
					image: 'https://avatars.githubusercontent.com/u/60108167',
					banner: 'https://pbs.twimg.com/profile_banners/2904443818/1670360272',
					bio: '!false geek',
					city: 'Felgueiras',
					country: 'Portugal',
					url: 'https://twitter.com/xeno98g',
					createdAt: '2023-11-19T17:46:43.887Z',
					acessToken: '6652990704591814 ',
				};
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => ({
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
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/auth/sign-in',
		newUser: '/auth/sign-up',
		signOut: '/auth/sign-out',
	},
	secret: env.NEXTAUTH_SECRET,
	useSecureCookies: env.NODE_ENV === 'production',
	debug: env.NODE_ENV === 'development',
};

export const getServerAuthSession = () => getServerSession(authOptions);
