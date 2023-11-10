export const ROUTES = {
	HOME: '/',
	CONNECTIONS: '/connections',
	MESSAGES: '/messages',
	NOTIFICATIONS: '/notifications',
	PROFILE: '/profile',
	ABOUT: '/about',
	FAQ: '/faq',
	CONTACT: '/contact',
	TERMS: '/terms',
	PRIVACY: '/privacy',
	MAINTENANCE: '/maintenance',
	SETTINGS: {
		ROOT: '/settings',
		GENERAL: {
			ACCOUNT: '/general/account',
			NOTIFICATIONS: '/general/notifications',
			APPEARANCE: '/general/appearance',
			LANGUAGE: '/general/language',
		},
		ACCOUNT: {
			INTEGRATIONS: '/account/integrations',
			EMAIL: '/account/email',
			PASSWORD: '/account/password',
			DISABLE: '/account/disable',
		},
		OTHERS: {
			HELP: '/others/help',
		},
	},
	AUTH: {
		SIGNIN: '/auth/sign-in',
		SIGNUP: '/auth/sign-up',
		SIGNOUT: '/auth/sign-out',
		FORGOT_PASSWORD: '/auth/forgot-password',
		RESET_PASSWORD: '/auth/reset-password',
	},
};
