import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { ProfileView } from '@/components/ProfilePage';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';
import { getUserById } from '@/services/Users';

export const metadata: Metadata = {
	title: 'Pulse Connect - Profile',
};

const ProfilePage: NextPage = async () => {
	const session = await getServerAuthSession();

	if (!session) throw new Error('User is not authenticated!');

	const queryClient = new QueryClient();
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ['users', session.user.id],
			queryFn: () => getUserById(session.user.id),
		}),
	]);

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.HOME} />
					<Title title='Profile' />
				</div>
				<Separator />
			</div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProfileView userId={session.user.id} />
			</HydrationBoundary>
		</Fragment>
	);
};

export default ProfilePage;
