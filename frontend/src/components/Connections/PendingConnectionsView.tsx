'use client';

import { useGetPendingConnections } from '@/hooks/useConnections';
import { type Connection } from '@/types/Connection';

import PendingConnectionCard from './PendingConnectionCard';

const PendingConnectionsView: React.FunctionComponent = (): React.ReactNode => {
	const { data, isLoading, error } = useGetPendingConnections();

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{data?.map((connection: Connection) => (
				<PendingConnectionCard
					key={connection.id}
					id={connection.id}
					image={connection.image}
					firstName={connection.firstName}
					lastName={connection.lastName}
					username={connection.username}
				/>
			))}
		</div>
	);
};

export default PendingConnectionsView;
