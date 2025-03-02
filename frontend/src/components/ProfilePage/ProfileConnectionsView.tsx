'use client';

import { Link as LinkIcon, Unlink } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useGetUserConnectionsById } from '@/hooks/useUsers';
import { APP_ROUTES } from '@/routes/APP';
import { getInitials } from '@/utils/get-initials';

type ProfileConnectionsViewProps = {
	userId: string;
};

const ProfileConnectionsView: React.FunctionComponent<
	ProfileConnectionsViewProps
> = ({ userId }): React.ReactNode => {
	const { isLoading, isError, data, error } =
		useGetUserConnectionsById(userId);
	const { data: session } = useSession();

	if (!session) return <div>Not authenticated</div>;

	if (isLoading) return <div>Loading...</div>;

	if (isError) throw new Error(error.message);

	if (!data) return <div>Not found!</div>;

	if (!data.length) return <div>No connections Found!</div>;

	const isOwner = session.user.id === userId;

	return (
		<Fragment>
			<div className='flex w-full flex-col gap-4 py-2'>
				{data.map((connection) => (
					<div
						key={connection.id}
						className='flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-accent'>
						<Link
							href={`${APP_ROUTES.PROFILE}/${connection.id}`}
							className='flex w-full flex-row items-center justify-start gap-x-2'>
							<Avatar>
								<AvatarImage
									src={connection.profileImageURL}
									alt={`${connection.firstName} ${connection.lastName} Profile Image`}
								/>
								<AvatarFallback>
									{getInitials(
										connection.firstName,
										connection.lastName,
									)}
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col items-start justify-between'>
								<span className='text-base font-medium'>
									{connection.firstName} {connection.lastName}
								</span>
								<span className='font-base text-xs text-muted-foreground'>
									@{connection.username}
								</span>
							</div>
						</Link>
						{isOwner ? (
							<Button variant='outline'>
								<Unlink className='mr-2 h-4 w-4' />
								Disconnect
							</Button>
						) : (
							<Button>
								<LinkIcon className='mr-2 h-4 w-4' />
								Connect
							</Button>
						)}
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default ProfileConnectionsView;
