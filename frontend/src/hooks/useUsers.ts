import { useQuery } from '@tanstack/react-query';

import { getUserById, getUserConnectionsById } from '@/services/Users';
import { type Connections } from '@/types/Connection';
import { type User } from '@/types/Users';

export const useGetUserById = (id: string) => {
	return useQuery<User>({
		queryKey: ['users', id],
		queryFn: () => getUserById(id),
	});
};

export const useGetUserConnectionsById = (id: string) => {
	return useQuery<Connections>({
		queryKey: ['users', id, 'connections'],
		queryFn: () => getUserConnectionsById(id),
	});
};

export const useGetUserNotificationsById = (id: string) => {
	return useQuery<User>({
		queryKey: ['users', id, 'notifications'],
		queryFn: () => getUserById(id),
	});
};
