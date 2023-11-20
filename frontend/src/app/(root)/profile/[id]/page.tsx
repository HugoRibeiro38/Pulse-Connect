import { QueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { ProfileView } from '@/components/Profile';
import { Title } from '@/components/Title';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/routes/app';
import { getUserById } from '@/services/Users';

export const metadata: Metadata = {
	title: 'Pulse Connect - Profile',
};

type ProfilePageProps = {
	params: { id: string };
	searchParams: Record<string, string | string[] | undefined>;
};

const ProfilePage: NextPage<ProfilePageProps> = async ({ params }) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['users', params.id],
		queryFn: () => getUserById(params.id),
	});

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between md:flex-row md:items-center'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<Button variant='ghost' size='icon' asChild>
						<Link href={APP_ROUTES.HOME}>
							<ArrowLeft />
						</Link>
					</Button>
					<Title title='Profile' />
				</div>
			</div>
			<ProfileView id={params.id} />
		</Fragment>
	);
};

export default ProfilePage;
