import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { ProfileConnectionsView } from '@/components/ProfilePage';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';
import { getUserConnectionsById } from '@/services/Users';

export const metadata: Metadata = {
	title: 'Pulse Connect - Profile Connections',
};

type ProfileConnectionsPageProps = {
	params: { id: string };
};

const ProfileConnectionsPage: NextPage<ProfileConnectionsPageProps> = async ({
	params,
}) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['users', params.id, 'connections'],
		queryFn: () => getUserConnectionsById(params.id),
	});

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.HOME} />
					<Title title='Profile Connections' />
				</div>
				<Separator />
			</div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProfileConnectionsView userId={params.id} />
			</HydrationBoundary>
		</Fragment>
	);
};

export default ProfileConnectionsPage;
