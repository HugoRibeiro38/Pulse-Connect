export const API_ROUTES = {
	USERS: {
		GET_USER_BY_ID: (id: string) => `/users/${id}`,
		GET_USER_NOTIFICATIONS_BY_ID: (id: string) =>
			`/users/${id}/notifications`,
		GET_USER_NOTIFICATIONS_TOTAL_BY_ID: (id: string) =>
			`/users/${id}/notifications/total`,
	},
	CONNECTIONS: {
		GET_CONNECTIONS: '/connections',
		GET_CONNECTIONS_BY_ID: (id: string) => `/connections/${id}`,
		CREATE_CONNECTIONS_BY_ID: (id: string) => `/connections/${id}`,
		DELETE_CONNECTION_BY_ID: (id: string) => `/connections/${id}`,
		VERIFY_IS_USER_CONNECTION_BY_ID: (id: string) => `/connections/${id}`,
		GET_PENDING_CONNECTIONS: '/pending',
		DELETE_PENDING_CONNECTION_BY_ID: (id: string) => `/pending/${id}`,
	},
};
