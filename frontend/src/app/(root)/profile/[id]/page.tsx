import { QueryClient } from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { ProfileView } from '@/components/Profile';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { APP_ROUTES } from '@/routes/app';
import { getUserById } from '@/services/Users';

export const metadata: Metadata = {
	title: 'Pulse Connect - Profile',
};

type ProfilePageProps = {
	params: { id: string };
};

const ProfilePage: NextPage<ProfilePageProps> = async ({ params }) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['users', params.id],
		queryFn: () => getUserById(params.id),
	});

	return (
		<Fragment>
			<div className='flex flex-row items-center justify-between gap-x-4'>
				<BackButton url={APP_ROUTES.HOME} />
				<Title title='Profile' />
			</div>
			<ProfileView userId={params.id} />
		</Fragment>
	);
};

export default ProfilePage;
