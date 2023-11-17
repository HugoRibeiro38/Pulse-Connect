export const API_ROUTES = {
	CONNECTIONS: {
		GET_CONNECTIONS: '/connections',
		GET_CONNECTIONS_BY_NAME: (name: string) => `/connections/${name}`,
		DELETE_CONNECTION: (id: string) => `/connections/${id}`,
		GET_PENDING_CONNECTIONS: '/pending',
		GET_PENDING_CONNECTIONS_BY_NAME: (name: string) => `/pending/${name}`,
		DELETE_PENDING_CONNECTION: (id: string) => `/pending/${id}`,
	},
};
