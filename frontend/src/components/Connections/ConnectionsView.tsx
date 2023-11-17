'use client';

import { useGetConnections } from '@/hooks/useConnections';
import { type Connection } from '@/types/Connection';

import ConnectionCard from './ConnectionCard';

const ConnectionsView: React.FunctionComponent = (): React.ReactNode => {
	const { data, isLoading, error } = useGetConnections();

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{data?.map((connection: Connection) => (
				<ConnectionCard
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

export default ConnectionsView;
