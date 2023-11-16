import { API_ROUTES } from '@/routes/api';

import axiosClient from './AxiosClient';

export const getConnections = async () => {
	const response = await axiosClient.get(
		API_ROUTES.CONNECTIONS.getConnections,
	);
	return response.data;
};

// export const deleteConnection = async (connectionId) => {
// 	return axios
// 		.delete(API_ROUTES.CONNECTIONS.deleteConnection(connectionId))
// 		.then((response) => response.data);
// };
