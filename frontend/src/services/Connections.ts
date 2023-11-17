import { API_ROUTES } from '@/routes/api';
import { type Connection, type Connections } from '@/types/Connection';
import { fetchData } from '@/utils/fetch-data';

export const getConnections = async (): Promise<Connections> => {
	return fetchData(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.CONNECTIONS.GET_CONNECTIONS}`,
		'GET',
	);
};

export const searchConnection = async (name: string) => {
	return fetchData(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.GET_CONNECTIONS_BY_NAME(name)}`,
		'GET',
	);
};

export const deleteConnection = async (id: string): Promise<Connection> => {
	return fetchData(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.DELETE_CONNECTION(id)}`,
		'DELETE',
	);
};

export const getPendingConnections = async (): Promise<Connections> => {
	return fetchData(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.CONNECTIONS.GET_PENDING_CONNECTIONS}`,
		'GET',
	);
};

export const searchPendingConnection = async (name: string) => {
	return fetchData(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.GET_PENDING_CONNECTIONS_BY_NAME(name)}`,
		'GET',
	);
};

export const deletePendingConnection = async (
	id: string,
): Promise<Connection> => {
	return fetchData(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.DELETE_PENDING_CONNECTION(id)}`,
		'DELETE',
	);
};
