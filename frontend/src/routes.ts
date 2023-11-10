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
			ACCOUNT: '/settings/general/account',
			NOTIFICATIONS: '/settings/general/notifications',
			APPEARANCE: '/settings/general/appearance',
			LANGUAGE: '/settings/general/language',
		},
		ACCOUNT: {
			INTEGRATIONS: '/settings/account/integrations',
			EMAIL: '/settings/account/email',
			PASSWORD: '/settings/account/password',
			DISABLE: '/settings/account/disable',
		},
		OTHERS: {
			HELP: '/settings/others/help',
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