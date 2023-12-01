import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/ui/use-toast';
import {
	createConnection,
	deleteConnection,
	deletePendingConnection,
	getConnections,
	getPendingConnections,
	verifyIsUserConnection,
} from '@/services/Connections';
import { type Connection, type Connections } from '@/types/Connection';
import { type User } from '@/types/Users';

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

export const useCreateConnection = (userId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (userId: string) => createConnection(userId),
		onMutate: async (userId: string) => {
			await queryClient.cancelQueries({ queryKey: ['user', userId] });
			const previousUser = queryClient.getQueryData<User>([
				'user',
				userId,
			]);
			queryClient.setQueriesData(
				{ queryKey: ['user', userId] },
				(old) => old && { ...old, isPending: true },
			);
			return { previousUser };
		},
		onError: (_error, _variables, context) => {
			queryClient.setQueriesData(
				{ queryKey: ['user', userId] },
				context?.previousUser,
			);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description:
					'There was a problem with your connection request.',
			});
		},
		onSuccess: (_data, _variables, _context) => {
			toast({
				title: 'Success!',
				description: 'The connection request has been sent.',
			});
		},
		onSettled: async (_data, _error, _variables, _context) => {
			await queryClient.invalidateQueries({ queryKey: ['user', userId] });
		},
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
					(connection: Connection) => connection.id !== id,
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

export const useVerifyIsUserConnection = (id: string) => {
	return useQuery<Connection>({
		queryKey: ['usersConnection', id],
		queryFn: () => verifyIsUserConnection(id),
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
