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
			email: string;
			firstName: string;
			lastName: string;
			image: string;
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
					id: '123',
					email: '',
					name: '',
					firstName: '',
					lastName: '',
					image: '',
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
