import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/services/Users';
import { type User } from '@/types/Users';

export const useGetUserById = (id: string) => {
	return useQuery<User>({
		queryKey: ['user', id],
		queryFn: () => getUserById(id),
	});
};
