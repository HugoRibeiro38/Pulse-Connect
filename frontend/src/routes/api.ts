export const API_ROUTES = {
	USER: {
		getUsers: '/users',
		getUserById: (id: string) => `/users/${id}`,
	},
	CONNECTIONS: {
		getConnections: '/connections',
	},
	AUTH: {
		signIn: '/auth/sign-in',
		signUp: '/auth/sign-up',
		signOut: '/auth/sign-out',
		forgotPassword: '/auth/forgot-password',
		resetPassword: '/auth/reset-password',
	},
};
