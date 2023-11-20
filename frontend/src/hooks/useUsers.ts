import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/services/Users';
import { type User } from '@/types/Users';

export const KEYS = {
	USERS: ['users'],
};

export const useGetUserById = (id: string) => {
	return useQuery<User>({
		queryKey: [...KEYS.USERS, id],
		queryFn: () => getUserById(id),
	});
};
