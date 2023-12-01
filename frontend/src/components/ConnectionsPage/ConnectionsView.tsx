'use client';

import { useGetConnections } from '@/hooks/useConnections';
import { type Connection } from '@/types/Connection';

import CardSkeleton from './CardSkeleton';
import ConnectionCard from './ConnectionCard';
import InformationMessage from './InformationMessage';

const ConnectionsView: React.FunctionComponent = (): React.ReactNode => {
	const { isLoading, isError, data, error } = useGetConnections();

	if (isLoading)
		return (
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{Array.from({ length: 8 }).map((_, index: number) => (
					<CardSkeleton key={`ConnectionView-${index}`} />
				))}
			</div>
		);

	if (isError)
		return <InformationMessage title='Error!' message={error.message} />;

	if (!data?.length)
		return (
			<InformationMessage
				title='No Connections Found!'
				message={
					'You have not connected with anyone yet. Search for users and send them a connection request.'
				}
			/>
		);

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{data.map((connection: Connection) => (
				<ConnectionCard
					key={connection.id}
					userId={connection.id}
					imageURL={connection.profileImageURL}
					firstName={connection.firstName}
					lastName={connection.lastName}
					username={connection.username}
				/>
			))}
		</div>
	);
};

export default ConnectionsView;
