import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import {
	ConnectionsView,
	PendingConnectionsView,
} from '@/components/ConnectionsPage';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KEYS } from '@/hooks/useConnections';
import { APP_ROUTES } from '@/routes/APP';
import { getConnections, getPendingConnections } from '@/services/Connections';

export const metadata: Metadata = {
	title: 'Pulse Connect - Connections',
};

const ConnectionsPage: NextPage = async () => {
	const queryClient = new QueryClient();
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: KEYS.CONNECTIONS,
			queryFn: getConnections,
		}),
		queryClient.prefetchQuery({
			queryKey: KEYS.PENDING_CONNECTIONS,
			queryFn: getPendingConnections,
		}),
	]);

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.HOME} />
					<Title title='Connections' />
				</div>
				<Separator />
			</div>
			<Tabs defaultValue='connections' className='flex w-full flex-col'>
				<TabsList>
					<TabsTrigger value='connections' className='w-full'>
						Connections
					</TabsTrigger>
					<TabsTrigger value='pending' className='w-full'>
						Pending
					</TabsTrigger>
				</TabsList>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<TabsContent value='connections' className='mt-8'>
						<ConnectionsView />
					</TabsContent>
					<TabsContent value='pending' className='mt-8'>
						<PendingConnectionsView />
					</TabsContent>
				</HydrationBoundary>
			</Tabs>
		</Fragment>
	);
};

export default ConnectionsPage;
