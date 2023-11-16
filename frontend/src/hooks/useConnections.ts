import { useQuery } from '@tanstack/react-query';

import { getConnections } from '@/services/Connections';

const keys = {
	getConnectios: ['connections'],
};

export const useGetConnections = () => {
	return useQuery({
		queryFn: getConnections,
		queryKey: keys.getConnectios,
	});
};

// export const useDeleteConnectin = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: deleteConnection,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries(keys.getConnectios);
// 		},
// 	});
// };
