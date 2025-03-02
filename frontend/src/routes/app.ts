export const APP_ROUTES = {
	HOME: '/',
	CONNECTIONS: '/connections',
	MESSAGES: '/messages',
	MESSAGES_CHAT: (id: string) => `/messages/${id}`,
	NOTIFICATIONS: '/notifications',
	PROFILE: '/profile',
	PROFILE_ID: (id: string) => `/profile/${id}`,
	PROFILE_CONNECTIONS: (id: string) => `/profile/${id}/connections`,
	SEARCH: (username: string) => `/search/q?=${username}`,
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
	},
	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
		SIGN_OUT: '/auth/sign-out',
		FORGOT_PASSWORD: '/auth/forgot-password',
		RESET_PASSWORD: '/auth/reset-password',
	},
};
