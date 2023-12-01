import { getSession } from 'next-auth/react';

import { API_ROUTES } from '@/routes/API';
import { type Connection, type Connections } from '@/types/Connection';

export const getConnections = async (): Promise<Connections> => {
	const session = await getSession();

	if (!session) {
		throw new Error('User is not authenticated!');
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.CONNECTIONS.GET_CONNECTIONS}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as Connections;
	return data;
};

export const createConnection = async (id: string): Promise<Connection> => {
	const session = await getSession();

	if (!session) {
		throw new Error('User is not authenticated!');
	}

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.CREATE_CONNECTIONS_BY_ID(id)}`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
			body: JSON.stringify({ id }),
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as Connection;
	return data;
};

export const deleteConnection = async (id: string): Promise<Connection> => {
	const session = await getSession();

	if (!session) {
		throw new Error('User is not authenticated!');
	}

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.DELETE_CONNECTION_BY_ID(id)}`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as Connection;
	return data;
};

export const verifyIsUserConnection = async (
	id: string,
): Promise<Connection> => {
	const session = await getSession();

	if (!session) {
		throw new Error('User is not authenticated!');
	}

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.VERIFY_IS_USER_CONNECTION_BY_ID(id)}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as Connection;
	return data;
};

export const getPendingConnections = async (): Promise<Connections> => {
	const session = await getSession();

	if (!session) {
		throw new Error('User is not authenticated!');
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.CONNECTIONS.GET_PENDING_CONNECTIONS}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as Connections;
	return data;
};

export const deletePendingConnection = async (
	id: string,
): Promise<Connection> => {
	const session = await getSession();

	if (!session) {
		throw new Error('User is not authenticated!');
	}

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.DELETE_PENDING_CONNECTION_BY_ID(id)}`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching data: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as Connection;
	return data;
};
