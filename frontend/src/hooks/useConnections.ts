import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import {
	deleteConnection,
	deletePendingConnection,
	getConnections,
	getPendingConnections,
} from '@/services/Connections';
import { type Connections } from '@/types/Connection';

export const KEYS = {
	CONNECTIONS: ['connections'],
	PENDING_CONNECTIONS: ['pending-connections'],
};

export const useGetConnections = () => {
	return useQuery<Connections>({
		queryKey: KEYS.CONNECTIONS,
		queryFn: getConnections,
	});
};

export const useDeleteConnection = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteConnection,
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: KEYS.CONNECTIONS });
			const previousConnections = queryClient.getQueryData<Connections>(
				KEYS.CONNECTIONS,
			);
			queryClient.setQueriesData(
				{ queryKey: KEYS.CONNECTIONS },
				previousConnections?.filter(
					(connection) => connection.id !== id,
				),
			);
			return { previousConnections };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueriesData(
				{ queryKey: KEYS.CONNECTIONS },
				context?.previousConnections,
			);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description:
					'There was a problem with your disconnect request.',
			});
		},
		onSettled: async () =>
			await queryClient.invalidateQueries({ queryKey: KEYS.CONNECTIONS }),
		onSuccess: () => {
			toast({
				title: 'Yes! Connection disconnected successully.',
				description: 'The connection has been disconnect.',
			});
		},
	});
};

export const useGetPendingConnections = () => {
	return useQuery<Connections>({
		queryKey: KEYS.PENDING_CONNECTIONS,
		queryFn: getPendingConnections,
	});
};

export const useDeletePendingConnection = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePendingConnection,
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({
				queryKey: KEYS.PENDING_CONNECTIONS,
			});
			const previousConnections = queryClient.getQueryData<Connections>(
				KEYS.PENDING_CONNECTIONS,
			);
			queryClient.setQueriesData(
				{ queryKey: KEYS.PENDING_CONNECTIONS },
				previousConnections?.filter(
					(connection) => connection.id !== id,
				),
			);
			return { previousConnections };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueriesData(
				{ queryKey: KEYS.PENDING_CONNECTIONS },
				context?.previousConnections,
			);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your cancel request.',
			});
		},
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: KEYS.PENDING_CONNECTIONS,
			}),
		onSuccess: () => {
			toast({
				title: 'Yes! Pending connection canceled successully.',
				description: 'The pending connection has been canceled.',
			});
		},
	});
};
