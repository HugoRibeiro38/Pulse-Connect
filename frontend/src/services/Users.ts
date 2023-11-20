import { API_ROUTES } from '@/routes/api';
import { type User } from '@/types/Users';
import { fetchData } from '@/utils/fetch-data';

export const getUserById = async (id: string): Promise<User> => {
	return fetchData(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.USERS.GET_USER_BY_ID(
			id,
		)}`,
		'GET',
	);
};
