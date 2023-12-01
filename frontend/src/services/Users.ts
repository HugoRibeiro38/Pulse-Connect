import { getSession } from 'next-auth/react';

import { API_ROUTES } from '@/routes/API';
import { type Connections } from '@/types/Connection';
import {
	type Notifications,
	type NotificationTotal,
} from '@/types/Notification';
import { type User } from '@/types/Users';

export const getUserById = async (id: string): Promise<User> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.USERS.GET_USER_BY_ID(
			id,
		)}`,
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
			`Error fetching user: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as User;
};

export const getUserConnectionsById = async (
	id: string,
): Promise<Connections> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

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
			`Error fetching user connections: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Connections;
};

export const getGetUserNotificationsById = async (
	id: string,
): Promise<Notifications> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.USERS.GET_USER_NOTIFICATIONS_BY_ID(id)}`,
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
			`Error fetching user notifications: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Notifications;
};

export const getUserNotificationsTotalById = async (
	id: string,
): Promise<NotificationTotal> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.USERS.GET_USER_NOTIFICATIONS_TOTAL_BY_ID(id)}`,
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
			`Error fetching user notifications total: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as NotificationTotal;
};
