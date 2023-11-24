export const API_ROUTES = {
	USERS: {
		GET_USER_BY_ID: (id: string) => `/users/${id}`,
	},
	CONNECTIONS: {
		GET_CONNECTIONS: '/connections',
		GET_CONNECTIONS_BY_NAME: (name: string) => `/connections/${name}`,
		CREATE_CONNECTIONS_BY_ID: (id: string) => `/connections/${id}`,
		DELETE_CONNECTION: (id: string) => `/connections/${id}`,
		GET_PENDING_CONNECTIONS: '/pending',
		GET_PENDING_CONNECTIONS_BY_NAME: (name: string) => `/pending/${name}`,
		DELETE_PENDING_CONNECTION: (id: string) => `/pending/${id}`,
	},
};
